import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AlertComponent } from './alert/alert.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const allModules = [
  MatButtonModule,
  MatIconModule,
  DragDropModule,
  MatTableModule,
  MatCheckboxModule,
  MatDialogModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatRadioModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [],
  imports: [...allModules],
  exports: [...allModules],
})
export class CommonsModule {}