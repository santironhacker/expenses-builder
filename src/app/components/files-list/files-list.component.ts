import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eb-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
})
export class FilesListComponent implements OnInit {
  @Input() uploadedFiles!: File[] | null;

  constructor() {}

  ngOnInit(): void {}
}
