import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '@app/service/account.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  loading = false;
  submitted = false;

  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginF() {
    return this.loginForm.controls;
  }

  get registerF() {
    return this.registerForm.controls;
  }


  onLoginSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.accountService.login(this.loginF.email.value, this.loginF.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          console.log(data);
        });
  }

  onRegisterSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.accountService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(data => {
        this.loading = false;
        console.log(data);
      });

  }

}
