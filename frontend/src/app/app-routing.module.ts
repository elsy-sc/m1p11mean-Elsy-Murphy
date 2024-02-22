import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelInput } from './components/labelinput/labelinput.component';
import { AppLayoutComponent } from './components/layout/app.layout.component';
import { InscriptionComponent } from './pages/inscription/inscription/inscription.component';
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
      // {path:'' , component: ListeUtilisateurComponent, canActivate: [AuthGuard]},
      // {path:'utilisateur/create' , component: CreateUtilisateurComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }