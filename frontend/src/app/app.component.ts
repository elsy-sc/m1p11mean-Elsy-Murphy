import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  valCheck: string[] = [];
  valRadio: string = '';
  cities: SelectItem[] = [];
  countries: SelectItem[] = [];  
  selectedMulti: any[] = [];
  numeroCarteBancaire: string = '';
}
