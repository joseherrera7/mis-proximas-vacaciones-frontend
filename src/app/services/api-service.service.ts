import { Character } from './../home/home.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private httpClient: HttpClient) {}

  getCards(correo: string): Observable<any[]> {
    let params = new HttpParams().set('correo', correo);
    return this.httpClient
      .get<any[]>(`${environment.server}/api/v1/cards`, { params })
      .pipe(
        tap(
          async (res: any) => {
            console.log(res);
          },
          (err) => {
            console.error(err);
          }
        )
      );
  }

  deleteCard(id: number): Observable<any> {
    return this.httpClient
      .delete(`${environment.server}/api/v1/cards/` + id)
      .pipe(
        tap(async (res: any) => {
          console.log(res);
        })
      );
  }

  createCard(character: Character): Observable<any> {
    return this.httpClient
      .post(`${environment.server}/api/v1/cards`, {
        name: character.name,
        category: character.category,
        lightsaberColor: character.lightsaberColor,
        species: character.species,
        gender: character.gender,
        height: character.height,
        weight: character.weight,
        description: character.description,
        img: character.img,
        correo: character.correo,
      })
      .pipe(
        tap(
          async (res: any) => {
            console.log(res);
          },
          (err) => {
            console.error(err);
          }
        )
      );
  }

  modifyCard(character: Character, id: number): Observable<any> {
    return this.httpClient
      .put(`${environment.server}/api/v1/cards/` + id, {
        name: character.name,
        category: character.category,
        lightsaberColor: character.lightsaberColor,
        species: character.species,
        gender: character.gender,
        height: character.height,
        weight: character.weight,
        description: character.description,
        img: character.img,
        correo: character.correo,
      })
      .pipe(
        tap(
          async (res: any) => {
            console.log(res);
          },
          (err) => {
            console.error(err);
          }
        )
      );
  }
}
