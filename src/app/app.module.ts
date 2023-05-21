import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpensesBuilderDialogComponent } from './components/expenses-builder-dialog/expenses-builder-dialog.component';
import { EditModeDirective } from './components/expenses-builder-dialog/form-table-content/editable-cell/edit-mode.directive';
import { EditOnEnterDirective } from './components/expenses-builder-dialog/form-table-content/editable-cell/edit-on-enter.directive';
import { EditableCellComponent } from './components/expenses-builder-dialog/form-table-content/editable-cell/editable-cell.component';
import { ViewModeDirective } from './components/expenses-builder-dialog/form-table-content/editable-cell/view-mode.directive';
import { FormTableContentComponent } from './components/expenses-builder-dialog/form-table-content/form-table-content.component';
import { FileItemComponent } from './components/file-item/file-item.component';
import { FileManagementComponent } from './components/file-management/file-management.component';
import { FilesListComponent } from './components/files-list/files-list.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadButtonComponent,
    FileManagementComponent,
    FilesListComponent,
    FileItemComponent,
    ExpensesBuilderDialogComponent,
    FormTableContentComponent,
    EditableCellComponent,
    EditModeDirective,
    ViewModeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
