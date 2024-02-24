import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'LabelInput',
  templateUrl: './labelinput.component.html',
  styleUrl: './labelinput.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LabelInput,
      multi: true
    }
  ]
})
export class LabelInput implements ControlValueAccessor{
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input({ required: true }) name!: string;
  @Input() value: string = '';
  @Input() iconLeft: string = '';
  @Input() iconRight: string = '';
  @Input() rest!: { [key: string]: any };
  @Input() model: any;

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

  onChange: any = (event: any) => { 
    const inputValue = (event.target as HTMLInputElement).value;
    this.model = inputValue;
    this.onChange();
  };
  onTouch: any = () => { };
  writeValue(obj: any): void {
      this.model = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
