import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { NombreReservationService } from '../../../services/statistique/nombrereservation/nombrereservation.service';

@Component({
  selector: 'app-nombre-reservation',
  templateUrl: './nombre-reservation.component.html',
  styleUrl: './nombre-reservation.component.css'
})
export class NombreReservation implements OnInit {

  barData: any;
  barOptions: any;

  lineData: any;
  lineOptions: any;
  lineLabel: any[] = [];
  dataJour: any[] = [];

  type: string = 'mois';
  types: string[] = [];

  debut: string = '';
  fin: string = '';

  annee: string = new Date().getFullYear().toString();

  dataMois: any[] = new Array(12).fill(0);

  constructor(private nombreReservationService: NombreReservationService) { }

  ngOnInit(): void {
    this.types = [
      'mois',
      'jour'
    ];
    this.getNombreReservationParMois();
  }

  initBarCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      datasets: [
        {
          label: 'Nombre de reservation',
          backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          borderColor: documentStyle.getPropertyValue('--primary-500'),
          data: this.dataMois
        }
      ]
    };

    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
      }
    };

  }

  initLineCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineData = {
      labels: this.lineLabel,
      datasets: [
        {
          label: 'Nombre reservation',
          data: this.dataJour,
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          borderColor: documentStyle.getPropertyValue('--primary-500'),
          tension: .4
        }
      ]
    };

    this.lineOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
      }
    };
  }

  getNombreReservationParMois() {
    this.nombreReservationService.readNombreReservationParMois(this.annee).subscribe(
      (response) => {
        response.data?.forEach(nombrereservation => {
          this.dataMois[nombrereservation._id - 1] = nombrereservation.nombrereservation;
        });
        this.initBarCharts();
      },
      (error) => {
        console.error(error);
      }
    )
  }

  generateMissingDates(startDate: string, endDate: string): void {
    const dates = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    this.lineLabel = dates;
    this.dataJour = new Array(this.lineLabel.length).fill(0);
  }


  getNombreReservationParJour() {
    this.nombreReservationService.readNombreReservationParJour(this.debut, this.fin).subscribe(
      (response) => {
        this.generateMissingDates(this.debut,this.fin);
        response.data?.forEach(nombrereservation => {
          const index = this.lineLabel.findIndex(label => label === nombrereservation._id);
          this.dataJour[index] = nombrereservation.nombrereservation;
        });
        this.initLineCharts();
      },
      (error) => {
        console.error(error);
      }
    )
  }

  onAnneeChange() {
    this.dataMois = new Array(12).fill(0);
    this.annee = new Date(this.annee).getFullYear().toString();
    this.getNombreReservationParMois();
  }

  onDateEntreChange() {
    this.lineLabel = [];
    this.dataJour = [];
    if (this.debut && this.fin  && this.debut.trim() != '' && this.fin.trim() != '') {
      this.getNombreReservationParJour();
    }
  }

}
