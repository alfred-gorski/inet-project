import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
  })
  
  hide = true;
/*
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
  */

  getErrorMessage(type: string){
    if (type=="email"){
      if (this.form.get('email')!.hasError('required')) {
        return 'You must enter a value';
      }
      return this.form.get('email')!.hasError('email') ? 'Not a valid email' : '';
    }
    return this.form.get(type)!.hasError('required') ? 'You must enter a value' : '';
  }

  // TODO: add submit
  onSubmit() {

  }

  constructor() { }

  ngOnInit(): void {
  }

}
