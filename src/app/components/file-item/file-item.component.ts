import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eb-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
})
export class FileItemComponent implements OnInit {
  @Input() fileInfo: any;

  constructor() {}

  ngOnInit(): void {}
}
