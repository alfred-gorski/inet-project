import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "../material/material.module";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

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
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }