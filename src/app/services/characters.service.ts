import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacter, ICharactersResponse } from '../interfaces/character.interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getCharacters(): Observable<ICharactersResponse>{
    return this.http.get<ICharactersResponse>(`${environment.api}character`);
  }

  getCharacterByPage(page: number): Observable<ICharactersResponse>{
    return this.http.get<ICharactersResponse>(`${environment.api}character/?page=${page}`);
  }

  getCharacterByName(name: string): Observable<ICharactersResponse>{
    return this.http.get<ICharactersResponse>(`${environment.api}character/?name=${name}`);
  }

  getCharacter(id: number): Observable<ICharacter>{
    return this.http.get<ICharacter>(`${environment.api}character/${id}`)
  }


}
