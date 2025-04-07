import { BehaviorSubject, map, Observable, scan, switchMap, throttleTime } from 'rxjs';
import { Component, ViewChild   } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { ICharacter } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-characters',
  imports: [ CommonModule, ScrollingModule ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  standalone: true,
})
export class CharactersComponent {
  @ViewChild('scrollContainer') scrollContainer!: CdkVirtualScrollViewport;

  public characters$?:Observable<ICharacter[][]>;
  public page$ = new BehaviorSubject<number>(1);

  constructor (
    private readonly charactersService: CharactersService,
  )
  {
    this.getCharacters();
  }

  ngAfterViewInit(): void {
    this.scrollContainer.elementScrolled().pipe(
      throttleTime(50),
    ).subscribe(()=> {
      console.log(this.scrollContainer.measureScrollOffset('bottom'))
      if (this.scrollContainer.measureScrollOffset('bottom') < 500) {
      this.page$.next(this.page$.value + 1);
      console.log(this.scrollContainer.measureScrollOffset('bottom'));
      }
    })
  }

  private chunkArray(arr: ICharacter[], size: number): ICharacter[][] {
    return arr.reduce((chunks: ICharacter[][], _, i) => {
      if (i % size === 0) chunks.push([]);
      chunks[chunks.length - 1].push(arr[i]);
      return chunks;
    }, []);
  }

  public getCharacters(): void {
    this.characters$ = this.page$.pipe(
      switchMap((page) =>
        this.charactersService.getCharacterByPage(page).pipe(
          map((response) => this.chunkArray(response.results, 5))
        )
      ),
      scan((allCharacters: ICharacter[][], newChunks: ICharacter[][]): ICharacter[][] => {
        return [...allCharacters, ...newChunks];
      }, [])
    );
  }

}
