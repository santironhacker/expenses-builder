import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { UploadedFile } from 'src/app/models/uploaded-file.model';

@Component({
  selector: 'eb-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
})
export class FilesListComponent implements OnInit {
  @Input() uploadedFiles!: UploadedFile[] | null;
  @Output() fileDelete = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onFileDelete(fileIndex: number) {
    this.fileDelete.emit(fileIndex);
  }
}
