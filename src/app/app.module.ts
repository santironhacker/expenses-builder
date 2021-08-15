import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { FileManagementComponent } from './components/file-management/file-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FilesListComponent } from './components/files-list/files-list.component';
import { FileItemComponent } from './components/file-item/file-item.component';
import { ExpensesBuilderDialogComponent } from './components/expenses-builder-dialog/expenses-builder-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadButtonComponent,
    FileManagementComponent,
    FilesListComponent,
    FileItemComponent,
    ExpensesBuilderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
