import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from './../../services/characters.service';
import { InfoComponent } from "../../components/info/info.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-character-info',
  imports: [InfoComponent, HeaderComponent],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.scss',
  standalone: true,
})
export class CharacterInfoComponent {

  constructor(private readonly route: ActivatedRoute, private readonly charactersService:CharactersService) {}

  ngOnInit() {
    this.route.params.subscribe(event => {
      this.charactersService.getCharacter(event['id']).subscribe((response) => {
      });
   });
  }
}
