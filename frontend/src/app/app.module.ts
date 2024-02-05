import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LabelInputModule } from './components/labelinput/labelinput.module';
import { AppLayoutModule } from './components/layout/app.layout.module';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    LabelInputModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule,
    LabelInputModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [App]
})
export class AppModule { }
