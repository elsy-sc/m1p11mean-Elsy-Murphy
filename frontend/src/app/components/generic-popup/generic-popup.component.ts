import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'generic-popup',
  templateUrl: './generic-popup.component.html',
  styleUrl: './generic-popup.component.css'
})
export class GenericPopup {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() show: boolean = false;
  @Output() handleClose: EventEmitter<any> = new EventEmitter();
  @Output() validClick: EventEmitter<any> = new EventEmitter();
  @Output() cancelClick: EventEmitter<any> = new EventEmitter();

  onValidButtonClick() {
    this.validClick.emit();
  }

  onCancelButtonClick() {
    this.cancelClick.emit();
  }

  onHandleClose() {
    this.handleClose.emit();
  }

}
