import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '@app/model/user';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { Reply } from '@app/model/user';


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


  register(user: User): Observable<Reply<User>> {
    return this.http.post<Reply<User>>(`${environment.apiUrl}/user`, user);
  }

  login(email: string, password: string): Observable<Reply<User>> {
    return this.http.post<Reply<User>>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(map(reply => {
        localStorage.setItem('user', JSON.stringify(reply.data));
        this.userSubject.next(reply.data);
        return reply;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/logout']);
  }

  public get userValue(): User|null {
    return this.userSubject?.value;
  }
}
