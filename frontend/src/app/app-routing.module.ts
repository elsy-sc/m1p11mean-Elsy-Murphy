import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelInput } from './components/labelinput/labelinput.component';
import { AppLayoutComponent } from './components/layout/app.layout.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUtilisateurComponent } from './pages/utilisateur/create-utilisateur/create-utilisateur.component';
import { ListeUtilisateurComponent } from './pages/utilisateur/liste-utilisateur/liste-utilisateur.component';
import { AuthGuard } from './services/routegarde/guard.route';
import { ReadService } from './pages/service/read-service/service.read';
import { CreateService } from './pages/service/create-service/service.create';
import { CreateCategorieService } from './pages/categorieservice/create-categorieservice/categorieservice.create';
import { ReadCategorieService } from './pages/categorieservice/read-categorieservice/categorieservice.read';
import { ReadEmploye } from './pages/employe/read-employe/employe.read';
import { CreateEmploye } from './pages/employe/create-employe/employe.create';
import { ReadTypeDepense } from './pages/typedepense/read-typedepense/typedepense.read';
import { CreateTypeDepense } from './pages/typedepense/create-typedepense/typedepense.create';
import { ReadDepense } from './pages/depense/read-depense/depense.read';
import { CreateDepense } from './pages/depense/create-depense/depense.create';
import { ReadSuiviEmployeRendezVous } from './pages/rendezvous/client/suiviemployerendezvous/read-suiviemployerendezvous/suiviemployerendezvous.read';
import { CreateSuiviEmployeRendezVous } from './pages/rendezvous/client/suiviemployerendezvous/create-suiviemployerendezvous/suiviemployerendezvous.create';
import { ReadSuiviEmployeRendezVousEmploye } from './pages/rendezvous/employe/read-suiviemployerendezvous/suiviemployerendezvous.read';
import { ProfilModule } from './pages/profil/profil.module';
import { Profil } from './pages/profil/profil';
import { CreateHorraireTravail } from './pages/horrairetravail/create-horrairetravail/horrairetravail-create.component';
import { ReadHorrairetravail } from './pages/horrairetravail/read-horrairetravail/horrairetravail-read.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { NombreReservation } from './pages/statistiques/nombre-reservation/nombre-reservation.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'beauty-salon' , component: AppLayoutComponent,
    children: [
      {path:'service/read' , component: ReadService , canActivate: [AuthGuard], data:{role: 0}},
      {path:'service/create' , component: CreateService , canActivate: [AuthGuard], data:{role: 0}},
      {path:'categorieservice/read' , component: ReadCategorieService , canActivate: [AuthGuard], data:{role: 0}},
      {path:'categorieservice/create' , component: CreateCategorieService , canActivate: [AuthGuard], data:{role: 0}},
      {path:'employe/read' , component: ReadEmploye, canActivate: [AuthGuard], data:{role: 0}},
      {path:'employe/create' , component: CreateEmploye, canActivate: [AuthGuard], data:{role: 0}},
      {path:'typedepense/read' , component: ReadTypeDepense, canActivate: [AuthGuard], data:{role: 0}},
      {path:'typedepense/create' , component: CreateTypeDepense, canActivate: [AuthGuard], data:{role: 0}},
      {path:'depense/read' , component: ReadDepense, canActivate: [AuthGuard], data:{role: 0}},
      {path:'depense/create' , component: CreateDepense, canActivate: [AuthGuard], data:{role: 0}},
      {path:'rendezvous/client/read' , component: ReadSuiviEmployeRendezVous, canActivate: [AuthGuard], data:{role: 2}},
      {path: 'rendezvous/client/create' , component: CreateSuiviEmployeRendezVous, canActivate: [AuthGuard], data:{role: 2}},
      {path: 'rendezvous/employe/read', component: ReadSuiviEmployeRendezVousEmploye, canActivate: [AuthGuard], data:{role: 1}},
      {path:'profil' , component: Profil, canActivate: [AuthGuard]},
      {path:'horrairetravail/create' , component: CreateHorraireTravail, canActivate: [AuthGuard], data:{role: 1}},
      {path:'horrairetravail/read' , component: ReadHorrairetravail, canActivate: [AuthGuard], data:{role: 1}},
      {path:'statistique/nombrereservation' , component: NombreReservation, canActivate: [AuthGuard], data:{role: 0}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }