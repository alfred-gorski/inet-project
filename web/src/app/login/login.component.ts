import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [Validators.required])
  })
  hide = true;

  getErrorMessage(child: string) {
    if (child == "email") {
      if (this.form.get('email')!.hasError('required')) {
        return 'You must enter a value';
      }
      return this.form.get('email')!.hasError('email') ? 'Not a valid email' : '';
    } else {
      return this.form.get('pwd')!.hasError('required') ? 'You must enter a value' : '';
    }
    
  }

  // TODO: add submit
  onSubmit() {

  }

  constructor() { }

  ngOnInit(): void {
  }

}
