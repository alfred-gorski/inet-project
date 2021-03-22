import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@app/service/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() registSuccessEvent = new EventEmitter();
  registerForm!: FormGroup;

  loading = false;
  submitted = false;

  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get registerF() {
    return this.registerForm.controls;
  }

  onRegisterSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.accountService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.registSuccessEvent.emit();
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }

}
