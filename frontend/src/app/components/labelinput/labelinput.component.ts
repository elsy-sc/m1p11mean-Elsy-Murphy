import { Component } from '@angular/core';

@Component({
  selector: 'LabelInput',
  templateUrl: './labelinput.component.html',
  styleUrl: './labelinput.component.css'
})
export class LabelInput {
  label: string = '';
  name: string = '';
  value: string = '';
}
