import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StatistiqueService } from '../../../services/statistique/statistique.service';

@Component({
  selector: 'app-moyenne-temps-travail-employe',
  templateUrl: './moyenne-temps-travail-employe.component.html',
  styleUrl: './moyenne-temps-travail-employe.component.css'
})
export class MoyenneTempsTravailEmploye implements OnInit, AfterViewInit {

  datedebut: string|undefined;
  datefin: string|undefined;

  moyennetempsdetravailemployes: any[] = [];

  constructor (private statistiqueService: StatistiqueService) {} 

  ngOnInit(): void {
      
  }

  isDateDebutAndDateFinIsNull () {
    if (this.datedebut && this.datefin && this.datedebut.trim() != '' && this.datefin.trim() != '') {
      return false;
    } 
    return true;
  }

  getMoyenneTempsTravailEmploye () {
    this.moyennetempsdetravailemployes = [];
    if (this.datedebut && this.datefin && this.datedebut.trim() != '' && this.datefin.trim() != '') {
      this.statistiqueService.getMoyenneTempsTravailEmploye(this.datedebut,this.datefin).subscribe(
        (response) => {
          if (response.data) {
            this.moyennetempsdetravailemployes = response.data;
          }
        } ,
        (error) => {
          console.error(error);
        } 
      );
      
    }
  }

  ngAfterViewInit(): void {
      
  }

}
