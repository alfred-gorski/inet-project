import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      tap( _ =>{
        console.log(`fetched restau id=${id}`);
      })
    );
  }

  getRestaus(): Observable<RestauResponse[]> {
    const url = `${this.restauUrl}`;
    return this.http.get<RestauResponse[]>(url);
  }


}
