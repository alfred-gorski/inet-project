import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@app/service/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  loading = false;
  submitted = false;

  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginF() {
    return this.loginForm.controls;
  }



  onLoginSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.accountService.login(this.loginF.email.value, this.loginF.password.value)
      .pipe(first())
      .subscribe(
        reply => {
          console.log(reply);
          this.router.navigate(['/']);
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }
}
