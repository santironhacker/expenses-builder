import { Directive, HostListener } from '@angular/core';
import { EditableCellComponent } from './editable-cell.component';

@Directive({
  selector: '[editableOnEnter]'
})
export class EditOnEnterDirective {
  constructor(private editableCell: EditableCellComponent) {
  }

  @HostListener('keyup.enter')
  onEnter() {
    this.editableCell.toViewMode();
  }

}
