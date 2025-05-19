import { CharactersService } from './../../services/characters.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CharactersComponent } from "../../components/characters/characters.component";
import { delay, map, Observable, tap } from 'rxjs';
import { ICharacter } from '../../interfaces/character.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CharactersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {

  public characters$?:Observable<ICharacter[]>;

  constructor(private readonly charactersService:CharactersService, private readonly storageService:StorageService) {}

  protected search($event: string):void {
    this.characters$ = this.charactersService.getCharacterByName($event).pipe(
      delay(300),
      tap((response) => {
        if (response.results.length > 0) {
          const currentHistory = this.storageService.getItem('searchHistory') || [];
          const updatedHistory = Array.isArray(currentHistory)
            ? [...new Set([ ...currentHistory, $event ])]
            : [$event];
          this.storageService.setItem('searchHistory', updatedHistory);
        }
      }),
      map((response) => response.results)
    )
  }

}
