import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CharactersComponent } from "../../components/characters/characters.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CharactersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {

}
