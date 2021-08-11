import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProcessedFile } from '../models/processed-file.model';
import { UploadedFile } from '../models/uploaded-file.model';
import { ReportBuilderService } from './report-builder.service';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  private uploadedFiles: UploadedFile[] = [];

  private uploadedFilesSource = new BehaviorSubject<UploadedFile[]>(
    this.uploadedFiles
  );

  public uploadedFiles$ = this.uploadedFilesSource.asObservable();

  constructor(
    private reportBuilderService: ReportBuilderService,
  ) { }

  addNewFile(file: File): void {
    const newFile: UploadedFile = {
      id: Date.now(),
      file: file,
      hasReportAvailable: false,
    };
    this.uploadedFiles.push(newFile);
    this.uploadedFilesSource.next(this.uploadedFiles);
  }

  removeFile(fileIndex: number): void {
    this.reportBuilderService.removeProcessedFile(this.uploadedFiles[fileIndex]);
    this.uploadedFiles.splice(fileIndex, 1);
    this.uploadedFilesSource.next(this.uploadedFiles);
  }

  processFileData(uploadedFile: UploadedFile) {
    this.reportBuilderService
      .getExpensesReport(uploadedFile)
      .pipe(
        take(1)
      )
      .subscribe(
        (processedFile: ProcessedFile) => {
          const fileIndex = this.findUploadedFileIndexById(processedFile.uploadedFileId);
          if (fileIndex !== -1) {
            this.uploadedFiles[fileIndex].hasReportAvailable = true;
            this.uploadedFilesSource.next(this.uploadedFiles);
          }
        }
      )
  }

  findUploadedFileIndexById(fileId: number): number {
    return this.uploadedFiles.findIndex(file => file.id === fileId);
  }

  downloadReport(fileIndex: number): void {
    this.reportBuilderService.downloadCSVFromJson(this.uploadedFiles[fileIndex]);
  }
}
