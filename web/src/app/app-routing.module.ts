import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { FavoriteComponent } from './favorite/favorite.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
