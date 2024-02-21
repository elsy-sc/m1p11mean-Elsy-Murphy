import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';


@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        RouterModule,
        AccordionModule,
        TableModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
