import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './component/user-add/user-add.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [ 
  { path: '',  redirectTo:'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },

  { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: 'addEditUsers', loadChildren: () => import('./pages/add-edit-users/add-edit-users.module').then(m => m.AddEditUsersModule), canActivate: [AuthGuard] },
  { path: 'addUsers', component: UserAddComponent , canActivate: [AuthGuard] },
  { path: 'editUsers/:id', component: UserAddComponent , canActivate: [AuthGuard]},
  
  { path: '*',  redirectTo:'login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
