import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './login/login.component';
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
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
