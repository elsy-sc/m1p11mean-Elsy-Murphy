import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { TextInput } from '../components/input/textinput.component';

@NgModule({
    declarations: [
        TextInput
    ],
    imports: [
        InputTextModule
    ],
})

export class InputModule { }