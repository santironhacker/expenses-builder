import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileManagerService } from 'src/app/services/file-manager.service';

@Component({
  selector: 'eb-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss'],
})
export class FileManagementComponent implements OnInit {
  uploadedFiles$: Observable<File[] | null>;

  constructor(private fileManagerService: FileManagerService) {
    this.uploadedFiles$ = this.fileManagerService.uploadedFiles$;
  }

  ngOnInit(): void {}

  public onFileUpload(file: File) {
    console.log('file', file);
    this.fileManagerService.addNewFile(file);

    // Later: for cloud upload
    // const formData = new FormData();
    // formData.append("thumbnail", file);
    // const upload$ = this.http.post("/api/thumbnail-upload", formData);
    // upload$.subscribe();
  }
}
