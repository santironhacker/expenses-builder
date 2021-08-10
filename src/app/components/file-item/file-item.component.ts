import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { UploadedFile } from 'src/app/models/uploaded-file.model';

@Component({
  selector: 'eb-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
})
export class FileItemComponent implements OnInit {
  @Input() fileInfo!: UploadedFile;
  @Input() fileIndex!: number;
  @Output() fileDelete = new EventEmitter<number>();
  @Output() processFileData = new EventEmitter<UploadedFile>();
  @Output() requestReportDownload = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  onDeleteItem(): void {
    this.fileDelete.emit(this.fileIndex);
  }

  onProcessFileData(): void {
    this.processFileData.emit(this.fileInfo);
  }

  onRequestReportDownload(): void {
    this.requestReportDownload.emit(this.fileIndex);
  }
}
