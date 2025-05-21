import { map, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ICharacter } from '@interfaces/character.interface';
import { CharactersService } from 'src/app/services/characters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  imports: [CommonModule, RouterModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
  standalone: true,
})
export class InfoComponent {
  constructor(private readonly route: ActivatedRoute, private readonly characterService:CharactersService) { }

  public characterId!: number;
  public character$!: Observable<ICharacter>;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.characterId = params['id'];
        this.character$ = this.characterService.getCharacter(this.characterId);
    })
  }
}
