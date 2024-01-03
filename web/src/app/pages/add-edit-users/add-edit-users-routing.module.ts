import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUsersComponent } from './add-edit-users.component';

const routes: Routes = [{ path: '', component: AddEditUsersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditUsersRoutingModule { }
