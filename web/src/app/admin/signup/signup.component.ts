import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupDTO, UserInfo } from '@app/model/user';
import { AccountService } from '@app/service/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() signupSuccessEvent = new EventEmitter();
  form!: FormGroup;

  loading = false;
  submitted = false;

  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onRegisterSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const value = this.form.value;

    const userinfo = new UserInfo(value.firstname, value.lastname);

    const input = new SignupDTO(value.email, value.password, userinfo);

    this.accountService.signup(input).pipe(first()).subscribe(
      response =>{
        console.log(response);
        this.router.navigate(['/']);
        this.loading = false;
        this.signupSuccessEvent.emit();
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );

  }
}
/*
this.accountService.register(this.registerForm.value)
.pipe(first())
.subscribe(
reply => {
console.log(reply);
this.loading = false;
this.registSuccessEvent.emit();
},
error => {
console.log(error);
this.loading = false;
});
}
*/
