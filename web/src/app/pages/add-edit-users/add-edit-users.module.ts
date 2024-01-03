import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditUsersRoutingModule } from './add-edit-users-routing.module';
import { AddEditUsersComponent } from './add-edit-users.component';
import { UserAddComponent } from 'src/app/component/user-add/user-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { OverlayModule } from "@angular/cdk/overlay";
import { ScrollingModule } from '@angular/cdk/scrolling';


import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import {MatRadioModule} from '@angular/material/radio';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AddEditUsersComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    AddEditUsersRoutingModule,
    FormsModule, ReactiveFormsModule,

    MatFormFieldModule, MatInputModule, MatSelectModule,
    ScrollingModule,
    OverlayModule,

    MatAutocompleteModule,

    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    
     

  ],
  exports:[UserAddComponent, MatSelectModule]
})
export class AddEditUsersModule { }
