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
import { InscriptionComponent } from './pages/inscription/inscription/inscription.component';
import { InscriptionModule } from './pages/inscription/inscription/inscription.module';
import { CreateUtilisateurModule } from './pages/utilisateur/create-utilisateur/create-utilisateur.module';


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
    CreateUtilisateurModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    MessageService
  ],
  bootstrap: [App]
})
export class AppModule { }
