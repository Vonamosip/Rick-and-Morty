import { BehaviorSubject, map, Observable, scan, switchMap } from 'rxjs';
import { Component, Input, input, output   } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { ICharacter } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollDirective } from '../../directives/appScrollEnd.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-characters',
  imports: [ CommonModule, ScrollingModule, ScrollDirective, RouterModule ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  standalone: true,
})
export class CharactersComponent {

  @Input() public characters$?: Observable<ICharacter[]>;

  public matrix$: Observable<ICharacter[][]> = new Observable<ICharacter[][]>;
  public page$ = new BehaviorSubject<number>(1);

  constructor(private readonly charactersService: CharactersService) {
    this.getCharacters();
  }

  private chunkArray(arr: ICharacter[], size: number): ICharacter[][] {
    return arr.reduce((chunks: ICharacter[][], _, i) => {
      if (i % size === 0) chunks.push([]);
      chunks[chunks.length - 1].push(arr[i]);
      return chunks;
    }, []);
  }

  public loadPage(): void {
    this.page$.next(this.page$.value + 1);
  }

  public getCharacters(): void {
    this.matrix$ = this.page$.pipe(
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

  ngOnChanges(): void {
    if (this.characters$) {
      this.matrix$ = this.characters$.pipe(
        map((characters) => this.chunkArray(characters, 5))
      );
    }
  }
}
