import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EBDialogData } from 'src/app/models/eb-dialog/eb-dialog-data.model';
import { UploadedFile } from 'src/app/models/uploaded-file.model';
import { FileManagerService } from 'src/app/services/file-manager.service';
import { ExpensesBuilderDialogComponent } from '../expenses-builder-dialog/expenses-builder-dialog.component';
import { FormTableUtils } from '../expenses-builder-dialog/form-table-content/form-table-utils';

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
    let editableHeaders: string[] = fileHeaders;
    editableHeaders.push('edit');
    const dialogData: EBDialogData = {
      title: {
        titleText: 'File headers detected',
      },
      content: {
        contentText: `The software has identified the following headers. Please, check and validate them. You can reword columns by clicking on the cells.`,
        formTable: {
          dataSource: FormTableUtils.includeEditColumn([FormTableUtils.convertHeadersToCellObject(fileHeaders)]),
          displayedColumns: editableHeaders
        }
      },
      closeBtn: {
        closeBtnText: 'Cancel',
      },
      confirmBtn: {
        confirmBtnText: 'Validate headers',
      }
    } as EBDialogData;
    this.dialog.open(ExpensesBuilderDialogComponent, {
      data: {
        ...dialogData
      }
    });
  }
}
