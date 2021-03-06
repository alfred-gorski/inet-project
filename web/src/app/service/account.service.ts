import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthResponse, LoginDTO, SignupDTO, User } from '@app/model/user';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AccountService {
  public user!: Observable<User | null>;
  private userSubject!: BehaviorSubject<User | null>;

  private authUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user') as string));
    this.user = this.userSubject.asObservable();
  }


  signup(signupDTO: SignupDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/signup`, signupDTO)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.userSubject.next(response.user);
          return response;
        })
      );
  }

  login(loginDTO: LoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, loginDTO)
      .pipe(
        tap(response =>{
          localStorage.setItem('token', response.token);
          this.userSubject.next(response.user);
          return response;
        }));
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/logout']);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.authUrl}/${id}`);
  }

  public get userValue(): User | null {
    return this.userSubject?.value;
  }
}
