import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { MaterialModule } from "../material/material.module";

import { LoginComponent } from "./login/login.component";
import { AdminComponent } from './admin.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormControl, 
    Validators, 
    FormGroup
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
