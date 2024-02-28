import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LabelInputModule } from './components/labelinput/labelinput.module';
import { AppLayoutModule } from './components/layout/app.layout.module';
import { CreateUtilisateurComponent } from './pages/utilisateur/create-utilisateur/create-utilisateur.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from "primeng/multiselect";
import { ListeUtilisateurModule } from './pages/utilisateur/liste-utilisateur/liste-utilisateur.module';
import { LoginModule } from './pages/login/login.module';
import {MessageService} from 'primeng/api';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CreateUtilisateurModule } from './pages/utilisateur/create-utilisateur/create-utilisateur.module';
import { ReadServiceModule } from './pages/service/read-service/service.read.module';
import { CreateServiceModule } from './pages/service/create-service/service.create.module';
import { CreateCategorieServiceModule } from './pages/categorieservice/create-categorieservice/categorieservice.create.module';
import { ReadCategorieServiceModule } from './pages/categorieservice/read-categorieservice/categorieservice.read.module';
import { ReadEmployeModule } from './pages/employe/read-employe/employe.read.module';
import { CreateEmployeModule } from './pages/employe/create-employe/employe.create.module';
import { ReadDepenseModule } from './pages/depense/read-depense/depense.read.module';
import { CreateDepenseModule } from './pages/depense/create-depense/depense.create.module';
import { ReadSuiviEmployeRendezVousModule } from './pages/rendezvous/client/suiviemployerendezvous/read-suiviemployerendezvous/suiviemployerendezvous.read.module';
import { CreateSuiviEmployeRendezVousModule } from './pages/rendezvous/client/suiviemployerendezvous/create-suiviemployerendezvous/suiviemployerendezvous.create.module';
import { ReadSuiviEmployeRendezVousEmployeModule } from './pages/rendezvous/employe/read-suiviemployerendezvous/suiviemployerendezvous.read.module';

import { ReadTypeDepenseModule } from './pages/typedepense/read-typedepense/typedepense.read.module';
import { CreateTypeDepenseModule } from './pages/typedepense/create-typedepense/typedepense.create.module';
import { ProfilModule } from './pages/profil/profil.module';
import { CreateHorrairetravailModule } from './pages/horrairetravail/create-horrairetravail/horrairetravail-create.module';
import { ReadHorrairetravailModule } from './pages/horrairetravail/read-horrairetravail/horrairetravail-read.module';
import { InscriptionModule } from './pages/inscription/inscription.module';
import { OffrespecialNotificationModule } from './pages/service/notification/offrespeciale.notification.module';
import { NombreReservationModule } from './pages/statistiques/nombre-reservation/nombre-reservation.module';
import { BeneficeNetModule } from './pages/statistiques/benefice-net/benefice-net.module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppLayoutModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    CheckboxModule,
    MultiSelectModule,
    ListeUtilisateurModule,
    LoginModule,
    HttpClientModule,
    InscriptionModule,
    CreateUtilisateurModule,
    ListeUtilisateurModule,
    ReadEmployeModule,
    CreateEmployeModule,
    ReadServiceModule,
    CreateServiceModule,
    CreateCategorieServiceModule,
    ReadCategorieServiceModule,
    ReadTypeDepenseModule,
    CreateTypeDepenseModule,
    ReadDepenseModule,
    CreateDepenseModule,
    ReadSuiviEmployeRendezVousModule,
    CreateSuiviEmployeRendezVousModule,
    ReadSuiviEmployeRendezVousEmployeModule,
    ProfilModule,
    CreateHorrairetravailModule,
    ReadHorrairetravailModule,
    OffrespecialNotificationModule,
    NombreReservationModule,
    BeneficeNetModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    MessageService
  ],
  bootstrap: [App]
})
export class AppModule { }
