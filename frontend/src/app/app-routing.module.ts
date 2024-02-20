import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelInput } from './components/labelinput/labelinput.component';
import { AppLayoutComponent } from './components/layout/app.layout.component';
import { InscriptionComponent } from './pages/inscription/inscription/inscription.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUtilisateurComponent } from './pages/utilisateur/create-utilisateur/create-utilisateur.component';
import { ListeUtilisateurComponent } from './pages/utilisateur/liste-utilisateur/liste-utilisateur.component';
import { AuthGuard } from './services/routegarde/guard.route';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'firstpage' , component: AppLayoutComponent,
    children: [
      {path:'' , component: ListeUtilisateurComponent, canActivate: [AuthGuard]},
      {path:'utilisateur/create' , component: CreateUtilisateurComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }