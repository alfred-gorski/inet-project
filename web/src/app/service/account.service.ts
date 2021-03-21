import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '@app/model/user';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AccountService {
  public user!: Observable<User>;
  private userSubject!: BehaviorSubject<User>;


  constructor(private http: HttpClient) {
    if (typeof localStorage.getItem('user') === 'string') {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user') as string));
      this.user = this.userSubject.asObservable();
    }
  }


  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/user`, user);
  }
}
