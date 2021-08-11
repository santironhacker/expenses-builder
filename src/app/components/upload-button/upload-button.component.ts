import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getLowercaseAcceptedFileFormats, getSpacedLowercaseAcceptedFileFormats } from 'src/app/enums/accepted-file-formats.enum';
import { SimpleDialogData } from 'src/app/models/simple-dialog-data.model';
import { Constants } from 'src/app/shared/constants';
import { SimpleDialog } from '../simple-dialog/simple-dialog.component';

@Component({
  selector: 'eb-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {
  fileName = '';
  @Output() fileUpload = new EventEmitter<File>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const isFileValid = this.isFileValid(file);
      if (isFileValid) {
        this.fileName = file.name;
        this.fileUpload.emit(file);
      } else {
        this.openInvalidFileDialog();
      }
    }
  }

  private isFileValid(file: File): boolean {
    const extensionIndex = file.name.indexOf(Constants.EXTENSION_SEPARATOR);
    const fileExtension = file.name.slice(extensionIndex + 1, file.name.length).toLowerCase();
    const isExtensionValid = getLowercaseAcceptedFileFormats().includes(fileExtension);
    return isExtensionValid;
  }

  private openInvalidFileDialog(): void {
    const dialogData: SimpleDialogData = {
      title: 'Invalid file type',
      content: `Please insert a valid file type among the following: ${getSpacedLowercaseAcceptedFileFormats()}`,
    }
    this.dialog.open(SimpleDialog, {
      data: {
        ...dialogData
      }
    });
  }
}
