import { HttpClient, HttpParams } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private httpClient: HttpClient) {}

  getImageInfo(image: string): Observable<any[]> {
    let body = {
      
       image
    };
    console.log('hace llamado')
    return this.httpClient
      .post<any[]>(`${environment.server}`, body)
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

  getWeatherInfo(place: string) {
    
    console.log('Weather of: ' , place)
    /*return this.httpClient
      .post<any[]>(`${environment.server}`)
      .pipe(
        tap(
          async (res: any) => {
            console.log(res);
          },
          (err) => {
            console.error(err);
          }
        )
      );*/
      
  }
}
