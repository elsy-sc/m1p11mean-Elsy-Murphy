import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'LabelInput',
  templateUrl: './labelinput.component.html',
  styleUrl: './labelinput.component.css'
})
export class LabelInput {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input({ required: true }) name!: string;
  @Input() value: string = '';
  @Input() iconLeft: string = '';
  @Input() iconRight: string = '';
  @Input() rest!: { [key: string]: any };

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  private setRest() {
    if (this.rest) {
      for (const [key] of Object.entries(this.rest)) {
        this.renderer.setAttribute(this.el.nativeElement.querySelector('input'), key, this.rest[key]);
      }
    }
  }


  ngOnInit() {
    this.setRest();
  }
}
