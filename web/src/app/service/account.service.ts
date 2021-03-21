import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '@app/model/user';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AccountService {
  public user!: Observable<User | null>;
  private userSubject!: BehaviorSubject<User | null>;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user') as string));
    this.user = this.userSubject.asObservable();
  }


  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user`, user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/logout']);
  }
}
