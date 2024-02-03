import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LabelInputModule } from './modules/labelinput.module';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    LabelInputModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [App]
})
export class AppModule { }
