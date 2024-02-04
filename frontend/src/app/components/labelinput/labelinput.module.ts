import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { LabelInput } from './labelinput.component';

@NgModule({
    declarations: [
        LabelInput
    ],
    imports: [
        InputTextModule
    ],
    exports: [
        LabelInput,
        InputTextModule
    ]
})

export class LabelInputModule { }