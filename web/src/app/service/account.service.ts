import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  public user!: Observable<User>;
  private userSubject!: BehaviorSubject<User>;


  constructor(http: HttpClient) {
    if (typeof localStorage.getItem('user') === 'string') {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user') as string));
      this.user = this.userSubject.asObservable();
    }
  }
}
