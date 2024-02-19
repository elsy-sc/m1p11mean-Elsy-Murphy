import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'create-utilisateur',
  templateUrl: './create-utilisateur.component.html',
  styleUrl: './create-utilisateur.component.css'
})
export class CreateUtilisateurComponent implements OnInit {

  cities: SelectItem[] = [];

  countries: SelectItem[] = [];

  valRadio: string = '';

  valCheck: string[] = [];

  selectedMulti: any[] = [];
  
  ngOnInit(): void {
    this.cities = [
      { label: 'Bacc', value: { id: 1, name: 'Bacc', code: 'BC' } },
      { label: 'Licence', value: { id: 2, name: 'Licence', code: 'LC' } },
      { label: 'Master', value: { id: 3, name: 'Master', code: 'MT' } },
      { label: 'Doctorat', value: { id: 4, name: 'Doctorat', code: 'DT' } }
    ];  

    this.countries = [
        {label: "Afghanistan",value: { name: "Afghanistan", code: "AF"}}, 
        {label: "Albania",value: { name: "Albania", code: "AL"}}, 
        {label: "Algeria",value: { name: "Algeria", code: "DZ"}}, 
        {label: "American Samoa",value: { name: "American Samoa", code: "AS"}}
    ]

  }

  submit() {
    
  }

}
