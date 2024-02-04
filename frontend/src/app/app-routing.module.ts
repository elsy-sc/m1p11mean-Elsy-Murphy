import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelInput } from './components/labelinput/labelinput.component';
import { AppLayoutComponent } from './components/layout/app.layout.component';

const routes: Routes = [
  {
    path: '' , component: AppLayoutComponent,
    children: [
      {path:'' , component: LabelInput}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }