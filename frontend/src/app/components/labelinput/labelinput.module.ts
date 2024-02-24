import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { LabelInput } from './labelinput.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LabelInput
    ],
    imports: [
        InputTextModule,
        FormsModule
    ],
    exports: [
        LabelInput,
        InputTextModule,
        FormsModule
    ]
})

export class LabelInputModule { }