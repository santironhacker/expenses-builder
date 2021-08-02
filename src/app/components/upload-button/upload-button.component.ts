import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'eb-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {

  fileName = '';
  @Output() fileUpload = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.fileUpload.emit(file);
    }
  }
}
