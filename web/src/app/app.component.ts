import { Component } from '@angular/core';
import { User } from './model/user';
import { AccountService } from './service/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  user!: User | null;

  constructor(
    private accountService: AccountService
  ) {
    this.accountService.user.subscribe(
      user => {
        this.user = user;
      });
  }

  logOut() {
    this.accountService.logout();
  }

}
