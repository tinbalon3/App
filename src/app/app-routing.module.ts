import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    // loadChildren: () => import('./login/login.component').then( m => m.LoginComponent)
    component: LoginComponent
  },
  {
    path: 'details',
    // loadChildren: () => import('./details/details.component').then( m => m.DetailsComponent)
    component: DetailsComponent
  },
  {
    path: 'register',
    // loadChildren: () => import('./register/register.component').then( m => m.RegisterComponent)
    component:RegisterComponent
  },
  {
    path: 'add',
    // loadChildren: () => import('./register/register.component').then( m => m.RegisterComponent)
    component:AddComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
