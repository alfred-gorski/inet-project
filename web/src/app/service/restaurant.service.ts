import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsgResponse } from '@app/model/msg';
import { RestauResponse } from '@app/model/restaurant';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restauUrl = `${environment.apiUrl}/restaus`;

  constructor(
    private http: HttpClient
  ) { }

  //TODO: error handling
  //TODO: image service
  getRestau(id: number): Observable<RestauResponse> {
    const url = `${this.restauUrl}/${id}`;
    return this.http.get<RestauResponse>(url)
      .pipe(
        tap(_ => {
          console.log(`fetched restau id=${id}`);
        }));
  }

  getRestaus(): Observable<RestauResponse[]> {
    const url = `${this.restauUrl}`;
    return this.http.get<RestauResponse[]>(url);
  }

  getFavoritedRestaus(): Observable<RestauResponse[]> {
    const url = `${this.restauUrl}?favorited=1`;
    return this.http.get<RestauResponse[]>(url);
  }

  favoriteRestau(id: number, favorite: boolean): Observable<MsgResponse> {
    const url = `${this.restauUrl}/favorite/${id}`;
    return this.http.patch<MsgResponse>(url, { favorited: favorite })
      .pipe(
        tap(_ => {
          console.log(`toggled restau id=${id} favorited:${favorite}`);
        }));
  }


}
