import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private uploadedFiles: File[] = [];

  private uploadedFilesSource = new BehaviorSubject<File[]>(this.uploadedFiles);

  public uploadedFiles$ = this.uploadedFilesSource.asObservable();

  constructor() { }

  addNewFile(file: File) {
    this.uploadedFiles.push(file);
    this.uploadedFilesSource.next(this.uploadedFiles);
  }
}
