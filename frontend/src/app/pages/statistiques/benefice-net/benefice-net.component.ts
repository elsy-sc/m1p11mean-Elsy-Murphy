import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { StatistiqueService } from '../../../services/statistique/statistique.service';

@Component({
  selector: 'app-benefice-net',
  templateUrl: './benefice-net.component.html',
  styleUrl: './benefice-net.component.css'
})
export class BeneficeNet implements OnInit {

  lineDataMois: any;
  lineOptionsMois: any;

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

  constructor(private statistiqueService: StatistiqueService) { }

  ngOnInit(): void {
    this.types = [
      'mois',
      'jour'
    ];
    this.getBeneficeNetParMois();
  }

  initLinehartsMois() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineDataMois = {
      labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      datasets: [
        {
          label: 'Benefice Net',
          backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          borderColor: documentStyle.getPropertyValue('--primary-500'),
          data: this.dataMois
        }
      ]
    };

    this.lineOptionsMois = {
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

  initLineCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineData = {
      labels: this.lineLabel,
      datasets: [
        {
          label: 'Benefice Net',
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

  getBeneficeNetParMois() {
    this.statistiqueService.readBeneficeNetParMois(this.annee).subscribe(
      (response) => {
        response.data?.forEach(beneficeNet => {
          this.dataMois[beneficeNet._id - 1] = beneficeNet.total;
        });
        this.initLinehartsMois();
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


  getBeneficeNetParJour() {
    this.statistiqueService.readBeneficeNetParJour(this.debut, this.fin).subscribe(
      (response) => {
        this.generateMissingDates(this.debut, this.fin);
        response.data?.forEach(beneficeNet => {
          const index = this.lineLabel.findIndex(label => label === beneficeNet._id);
          this.dataJour[index] = beneficeNet.total;
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
    this.getBeneficeNetParMois();
  }

  onDateEntreChange() {
    this.lineLabel = [];
    this.dataJour = [];
    if (this.debut && this.fin && this.debut.trim() != '' && this.fin.trim() != '') {
      this.getBeneficeNetParJour();
    }
  }

}
