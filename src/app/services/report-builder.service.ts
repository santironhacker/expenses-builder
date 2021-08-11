import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { Observable, Subject } from 'rxjs';
import { ProcessedFile } from '../models/processed-file.model';
import { UploadedFile } from '../models/uploaded-file.model';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ReportBuilderService {
  private processedFiles: ProcessedFile[] = [];
  private currentProcessedFileSource = new Subject<ProcessedFile>();
  public currentProcessedFile$ = this.currentProcessedFileSource.asObservable();

  constructor() { }

  getExpensesReport(uploadedFile: UploadedFile): Observable<ProcessedFile> {
    console.log('Creating report for file ', uploadedFile.file.name);

    Papa.parse(uploadedFile.file, {
      // worker: true,
      header: true,
      skipEmptyLines: 'greedy',
      transform: function (value, header) {
        console.log('header-value', header);
        return value;
      },
      /* step: function(row) {
        console.log("Row:", row.data);
      }, */
      complete: (results: Papa.ParseResult<object>, file: File) => {
        console.log("Parsing complete:", results, file);
        const newProcessedFile: ProcessedFile = {
          uploadedFileId: uploadedFile.id,
          papaParseResult: results
        }
        this.processedFiles.push(newProcessedFile);
        this.currentProcessedFileSource.next(newProcessedFile);
      }
    });

    return this.currentProcessedFile$;
  }

  downloadCSVFromJson(uploadedFile: UploadedFile): void {
    const processedFile = this.findProcessedFileById(uploadedFile.id);
    if (processedFile) {
      // convert JSON to CSV
      const arrayOfJson: object[] = processedFile.papaParseResult.data;
      const headers = processedFile.papaParseResult.meta.fields;
      const csv = Papa.unparse({
        "fields": headers ? headers : [undefined],
        "data": arrayOfJson
      }, {});

      // Create link and download
      const extensionIndex = uploadedFile.file.name.indexOf(Constants.EXTENSION_SEPARATOR);
      const originalFilename = uploadedFile.file.name.slice(0, extensionIndex);
      const filename = `${originalFilename}-copy${Constants.EXTENSION_SEPARATOR}${Constants.CSV}`;
      var link = document.createElement('a');
      link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  removeProcessedFile(uploadedFile: UploadedFile): void {
    const processedFileIndex = this.findProcessedFileIndexById(uploadedFile.id);
    if (processedFileIndex !== -1) {
      this.processedFiles.splice(processedFileIndex, 1);
    }
  }

  findProcessedFileById(fileId: number): ProcessedFile | undefined {
    return this.processedFiles.find(file => file.uploadedFileId === fileId);
  }

  findProcessedFileIndexById(fileId: number): number {
    return this.processedFiles.findIndex(file => file.uploadedFileId = fileId);
  }
}
