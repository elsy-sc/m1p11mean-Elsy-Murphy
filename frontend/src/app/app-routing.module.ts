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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'beauty-salon' , component: AppLayoutComponent,
    children: [
      {path:'service/read' , component: ReadService},
      {path:'service/create' , component: CreateService},
      {path:'categorieservice/read' , component: ReadCategorieService},
      {path:'categorieservice/create' , component: CreateCategorieService},
      {path:'employe/read' , component: ReadEmploye},
      {path:'employe/create' , component: CreateEmploye},
      {path:'typedepense/read' , component: ReadTypeDepense},
      {path:'typedepense/create' , component: CreateTypeDepense},
      {path:'depense/read' , component: ReadDepense},
      {path:'depense/create' , component: CreateDepense},
      {path:'rendezvous/client/read' , component: ReadSuiviEmployeRendezVous},
      {path: 'rendezvous/client/create' , component: CreateSuiviEmployeRendezVous},
      {path: 'rendezvous/employe/read', component: ReadSuiviEmployeRendezVousEmploye},
      {path:'profil' , component: Profil},
      {path:'horrairetravail/create' , component: CreateHorraireTravail},
      {path:'horrairetravail/read' , component: ReadHorrairetravail},
      // {path:'' , component: ListeUtilisateurComponent, canActivate: [AuthGuard]},
      // {path:'test' , component: ListeUtilisateurComponent, canActivate: [AuthGuard]},
      // {path:'utilisateur/create' , component: CreateUtilisateurComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }