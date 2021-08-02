import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eb-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss']
})
export class FileManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onFileUpload(file: File) {
    console.log('file', file);

    // Later: for cloud upload
    // const formData = new FormData();
    // formData.append("thumbnail", file);
    // const upload$ = this.http.post("/api/thumbnail-upload", formData);
    // upload$.subscribe();
  }

}
