import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../../services/layout/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
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
                label: 'Rendez-vous',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/beauty-salon/'],
                items: [
                    {
                        label: 'Rendez-vous Client',
                        icon: 'pi pi-fw pi-calendar',
                        items: [
                            {
                                label: 'Prendre un rendez-vous',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['rendezvous/client/create']
                            },
                            {
                                label: 'Rendez-vous client',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['rendezvous/client/read']
                            }
                        ]
                    },
                    {
                        label: 'Rendez-vous Employe',
                        icon: 'pi pi-fw pi-calendar',
                        items: [
                            {
                                label: 'Rendez-vous employe',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['rendezvous/employe/read']
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
            }
            // {
            //     label: 'Home',
            //     items: [
            //         { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
            //     ]
            // },
            // {
            //     label: 'Menu',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Utilisateur',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'ajouter',
            //                     icon: 'pi pi-fw pi-plus',
            //                     routerLink: ['/firstpage/utilisateur/create']
            //                 },
            //                 {
            //                     label: 'liste',
            //                     icon: 'pi pi-fw pi-list',
            //                     routerLink: ['/firstpage']
            //                 }
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 3', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 3.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 3.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 3.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 3.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 3.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // }
        ];
    }
}
