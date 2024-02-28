import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Employe } from '../../../models/employe.model';
import { LayoutService } from '../../../services/layout/app.layout.service';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private utilisateurService: UtilisateurService) { }

    ngOnInit() {

        this.utilisateurService.setUserConnecteInStorage();
        this.utilisateurService.utilisateurConnecte.subscribe(
            (user) => {
                if (user?.role == 1) {
                    this.model = [
                        {
                            label: 'Profil',
                            routerLink: ['/beauty-salon/'],
                            items: [
                                {
                                    label: 'Profil',
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: ['profil']
                                },
                                {
                                    label: 'Horaire de travail',
                                    icon: 'pi pi-fw pi-calendar-times',
                                    items: [
                                        {
                                            label: 'ajouter',
                                            icon: 'pi pi-fw pi-plus',
                                            routerLink: ['horrairetravail/create']
                                        },
                                        {
                                            label: 'liste',
                                            icon: 'pi pi-fw pi-list',
                                            routerLink: ['horrairetravail/read']
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'Rendez-vous',
                            icon: 'pi pi-fw pi-calendar',
                            routerLink: ['/beauty-salon/'],
                            items: [
                                {
                                    label: 'Rendez-vous',
                                    icon: 'pi pi-fw pi-list',
                                    routerLink: ['rendezvous/employe/read']
                                },
                                {
                                    label: 'Suivi des tâches',
                                    icon: 'pi pi-fw pi-list'
                                }
                            ]
                        },
                    ];
                }
                if (user?.role == 2) {
                    this.model = [
                        {
                            label: 'Profil',
                            routerLink: ['/beauty-salon/'],
                            items: [
                                {
                                    label: 'Profil',
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: ['profil']
                                }
                            ]
                        },
                        {
                            label: "Rendez-vous",
                            routerLink: ['/beauty-salon/'],
                            items: [
                                {
                                    label: 'Prendre un rendez-vous',
                                    icon: 'pi pi-fw pi-plus',
                                    routerLink: ['rendezvous/client/create']
                                },
                                {
                                    label: 'liste rendez-vous',
                                    icon: 'pi pi-fw pi-list',
                                    routerLink: ['rendezvous/client/read']
                                }
                            ]
                        }
                    ];
                }
                if (user?.role == 0) {
                    this.model = [
                        {
                            label: 'Profil',
                            routerLink: ['/beauty-salon/'],
                            items: [
                                {
                                    label: 'Profil',
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: ['profil']
                                }
                            ]
                        },
                        {
                            label: 'Personnel',
                            routerLink: ['/beauty-salon/'],
                            items: [
                                {
                                    label: 'Employe',
                                    icon: 'pi pi-fw pi-user',
                                    items: [
                                        {
                                            label: 'ajouter',
                                            icon: 'pi pi-fw pi-plus',
                                            routerLink: ['employe/create']
                                        },
                                        {
                                            label: 'liste',
                                            icon: 'pi pi-fw pi-list',
                                            routerLink: ['employe/read']
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'Services',
                            icon: 'pi pi-fw pi-briefcase',
                            routerLink: ['/beauty-salon/'],
                            items: [
                                {
                                    label: 'Service',
                                    icon: 'pi pi-cog',
                                    items: [
                                        {
                                            label: 'ajouter',
                                            icon: 'pi pi-fw pi-plus',
                                            routerLink: ['service/create']
                                        },
                                        {
                                            label: 'liste',
                                            icon: 'pi pi-fw pi-list',
                                            routerLink: ['service/read']
                                        }
                                    ]
                                },
                                {
                                    label: 'Catégorie de service',
                                    icon: 'pi pi-list',
                                    items: [
                                        {
                                            label: 'ajouter',
                                            icon: 'pi pi-fw pi-plus',
                                            routerLink: ['categorieservice/create']
                                        },
                                        {
                                            label: 'liste',
                                            icon: 'pi pi-fw pi-list',
                                            routerLink: ['categorieservice/read']
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            label: 'Depense',
                            routerLink: ['/beauty-salon/'],
                            items: [
                                {
                                    label: 'Type de depense',
                                    icon: 'pi pi-list',
                                    items: [
                                        {
                                            label: 'ajouter',
                                            icon: 'pi pi-fw pi-plus',
                                            routerLink: ['typedepense/create']
                                        },
                                        {
                                            label: 'liste',
                                            icon: 'pi pi-fw pi-list',
                                            routerLink: ['typedepense/read']
                                        }
                                    ]
                                },
                                {
                                    label: 'Depense',
                                    icon: 'pi pi-list',
                                    items: [
                                        {
                                            label: 'ajouter',
                                            icon: 'pi pi-fw pi-plus',
                                            routerLink: ['depense/create']
                                        },
                                        {
                                            label: 'liste',
                                            icon: 'pi pi-fw pi-list',
                                            routerLink: ['depense/read']
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'Statistique',
                            routerLink: ['/beauty-salon/'],
                            items: [
                                {
                                    label: 'Nombre de reservation',
                                    icon: 'pi pi-fw pi-chart-bar',
                                    routerLink: ['statistique/nombrereservation']
                                },
                                {
                                    label: "Chiffre d'affaires",
                                    icon: 'pi pi-fw pi-chart-line',
                                    routerLink: ['statistique/beneficenet']
                                }
                            ]
                        }
                    ];
                }
            }
        )
    }
}
