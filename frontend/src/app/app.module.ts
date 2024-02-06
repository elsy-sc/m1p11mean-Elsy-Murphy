import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LabelInputModule } from './components/labelinput/labelinput.module';
import { AppLayoutModule } from './components/layout/app.layout.module';
import { UtilisateurComponent } from './pages/utilisateur/utilisateur.component';
import { CreateUtilisateurComponent } from './pages/utilisateur/create-utilisateur/create-utilisateur.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from "primeng/multiselect";


@NgModule({
  declarations: [
    App,
    CreateUtilisateurComponent
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
    MultiSelectModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [App]
})
export class AppModule { }
