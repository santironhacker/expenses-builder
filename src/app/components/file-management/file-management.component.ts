import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EBDialogData } from 'src/app/models/eb-dialog/eb-dialog-data.model';
import { SimpleDialogData } from 'src/app/models/simple-dialog-data.model';
import { UploadedFile } from 'src/app/models/uploaded-file.model';
import { FileManagerService } from 'src/app/services/file-manager.service';
import { ExpensesBuilderDialogComponent } from '../expenses-builder-dialog/expenses-builder-dialog.component';
import { SimpleDialog } from '../simple-dialog/simple-dialog.component';

@Component({
  selector: 'eb-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss'],
})
export class FileManagementComponent implements OnInit {
  uploadedFiles$: Observable<UploadedFile[] | null>;
  fileHeadersPreview$!: Observable<string[] | null>;

  constructor(
    public dialog: MatDialog,
    private fileManagerService: FileManagerService,
  ) {
    this.uploadedFiles$ = this.fileManagerService.uploadedFiles$;
  }

  ngOnInit(): void { }

  public onFileUpload(file: File) {
    console.log('file', file);
    this.fileManagerService.addNewFile(file);

    // Later: for cloud upload
    // const formData = new FormData();
    // formData.append("thumbnail", file);
    // const upload$ = this.http.post("/api/thumbnail-upload", formData);
    // upload$.subscribe();
  }

  onFileDelete(fileIndex: number) {
    this.fileManagerService.removeFile(fileIndex);
  }

  onProcessFileData(uploadedFile: UploadedFile): void {
    // Check headers
    // this.fileHeadersPreview$ =
    this.fileManagerService.checkHeaders(uploadedFile)
      .subscribe(
        (fileHeaders: string[]) => {
          this.openValidateFileHeadersDialog(fileHeaders);
        }
      )

    // Process File
    // this.fileManagerService.processFileData(uploadedFile);
  }

  onRequestReportDownload(fileIndex: number): void {
    this.fileManagerService.downloadReport(fileIndex);
  }

  private openValidateFileHeadersDialog(fileHeaders: string[]) {
    const dialogData: EBDialogData = {
      title: {
        titleText: 'Invalid file type',
      },
      content: {
        contentText: `Please insert a valid file type among the following: ${fileHeaders}`,
      },
      closeBtn: {
        closeBtnText: 'Cancel',
      }
    }
    this.dialog.open(ExpensesBuilderDialogComponent, {
      data: {
        ...dialogData
      }
    });
  }
}
