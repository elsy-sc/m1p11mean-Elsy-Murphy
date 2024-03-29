import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Utilisateur } from '../../../models/utilisateur.model';
import { LayoutService } from "../../../services/layout/app.layout.service";
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];
    
    tieredItems: MenuItem[] = [];

    utilisateur?: Utilisateur;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private utilisateurservice: UtilisateurService, private ngZone: NgZone, private router: Router) { }


    ngOnInit(): void {
        this.utilisateurservice.setUserConnecteInStorage();
        this.utilisateurservice.utilisateurConnecte.subscribe(
            (user) => {
                // this.ngZone.run(() => {
                    this.utilisateur = user;
                // });
            }
        );
        //on cick utilisateurs
        this.items = [
            {
                label: this.utilisateur?.nom +' '+this.utilisateur?.prenom,
                icon: '',
                command: () => this.profile()
            },
            {
                label: 'Deconnexion',
                icon: 'pi pi-power-off',
                command: () => this.logout()
            }
        ];

        this.tieredItems = [
            {
                label: 'Customers',
                icon: 'pi pi-fw pi-table',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Customer',
                                icon: 'pi pi-fw pi-plus'
                            },
                            {
                                label: 'Duplicate',
                                icon: 'pi pi-fw pi-copy'
                            },

                        ]
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label: 'Orders',
                icon: 'pi pi-fw pi-shopping-cart',
                items: [
                    {
                        label: 'View',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-search'
                    }

                ]
            },
            {
                label: 'Shipments',
                icon: 'pi pi-fw pi-envelope',
                items: [
                    {
                        label: 'Tracker',
                        icon: 'pi pi-fw pi-compass',

                    },
                    {
                        label: 'Map',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Manage',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            },
            {
                label: 'Shipments',
                icon: 'pi pi-fw pi-envelope',
                items: [
                    {
                        label: 'Tracker',
                        icon: 'pi pi-fw pi-compass',

                    },
                    {
                        label: 'Map',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Manage',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            }
        ];

    }

    logout () {
        this.utilisateurservice.logout();
    }

    profile () {
        this.router.navigate(['beauty-salon/profil']);
    }

}
