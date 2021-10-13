import { LoginComponent } from './../login/login.component';
import { AuthGuard } from './../services/auth/auth.guard';
import { DetailComponent } from './../detail/detail.component';
import { CreateComponent } from './../create/create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail',
    component: DetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modify',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
