import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  ) {}

  addNewFile(file: File): void {
    const newFile: UploadedFile = {
      id: Date.now(),
      file: file,
    };
    this.uploadedFiles.push(newFile);
    this.uploadedFilesSource.next(this.uploadedFiles);
  }

  removeFile(fileIndex: number): void {
    this.uploadedFiles.splice(fileIndex, 1);
    this.uploadedFilesSource.next(this.uploadedFiles);
  }

  processFileData(uploadedFile: UploadedFile) {
   this.reportBuilderService.getExpensesReport();
  }
}
