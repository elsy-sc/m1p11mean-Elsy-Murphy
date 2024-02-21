import { Checkbox, getCheckboxHtml } from "../interfaces/annotations/components/checkbox.annotation.component";
import { getCloseFormHtml, getOpenFormHtml } from "../interfaces/annotations/components/form.annotation.component";
import { LabelInput, getLabelInputHtml } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Radio, getRadioHtml } from "../interfaces/annotations/components/radio.annotation.component";
import { Select, getSelectHtml } from "../interfaces/annotations/components/select.annotation.component";
import { Textarea, getTextareaHtml } from "../interfaces/annotations/components/textarea.annotation.component";
import { getTitleHtml } from "../interfaces/annotations/list.annotation";
import { PAGE_PATH, SERVICE_PATH } from "../utils/constante.util";
import { writeToFile } from "../utils/file.util";
import { getFields } from "../utils/reflect.util";

export class HtmlTsObject {

    public getLabelInputsHtml(): string {
        let result = '';
        const fields = getFields(this);
        for (const field of fields) {
            const labelInput: LabelInput = Reflect.getMetadata('LabelInput', this, field.name);
            if (labelInput) {
                result = result + getLabelInputHtml(labelInput) + '\n';
            }
        }
        return result;
    }

    public getTextareasHtml(): string {
        let result = '';
        const fields = getFields(this);
        for (const field of fields) {
            const textarea: Textarea = Reflect.getMetadata('Textarea', this, field.name);
            if (textarea) {
                result = result + getTextareaHtml(textarea) + '\n';
            }
        }
        return result;
    }

    public getCheckboxesHtml(): string {
        let result = '';
        const fields = getFields(this);
        for (const field of fields) {
            const checkbox: Checkbox = Reflect.getMetadata('Checkbox', this, field.name);
            if (checkbox) {
                result = result + getCheckboxHtml(checkbox) + '\n';
            }
        }
        return result;
    }

    public getRadiosHtml(): string {
        let result = '';
        const fields = getFields(this);
        for (const field of fields) {
            const radio: Radio = Reflect.getMetadata('Radio', this, field.name);
            if (radio) {
                result = result + getRadioHtml(radio) + '\n';
            }
        }
        return result;
    }

    public getSelectsHtml(): string {
        let result = '';
        const fields = getFields(this);
        for (const field of fields) {
            const select: Select = Reflect.getMetadata('Select', this, field.name);
            if (select) {
                result = result + getSelectHtml(select) + '\n';
            }
        }
        return result;
    }

    public getElementsHtml(): string {
        return this.getLabelInputsHtml() + this.getTextareasHtml() + this.getCheckboxesHtml() + this.getRadiosHtml() + this.getSelectsHtml();
    }

    public getCreateHtml(): string {
        const form = Reflect.getMetadata('Form', this.constructor);
        let result = '';
        if (form) {
            result = result + '<div class="grid"><div class="col-8 md:col-6"><div class="card p-fluid">' + getOpenFormHtml(form) + '<h5>Création de ' + this.constructor.name + '</h5>';
            
            for(const field of getFields(this)) {
                const labelInput: LabelInput = Reflect.getMetadata('LabelInput', this, field.name);
                if (labelInput) {
                    labelInput.restString = (labelInput.restString ? labelInput.restString : '') + '[(ngModel)]="' + this.constructor.name.toLowerCase() + '.' + field.name + '" (input)="onInput()"' + '[ngClass]="{' + '\'ng-dirty ng-invalid\' : error && errors[0]?.field ===\'' + field.name + '\'} "';
                    result = result + getLabelInputHtml(labelInput);
                    result = result + '<p *ngIf="error && errors[0]?.field === \'' + field.name + '\'" class="text-danger">{{errors[0]?.message}}</p>';
                }
                const textarea: Textarea = Reflect.getMetadata('Textarea', this, field.name);
                if (textarea) {
                    textarea.rest = (textarea.rest ? textarea.rest : '') + '[(ngModel)]="' + this.constructor.name.toLowerCase() + '.' + field.name + '" (input)="onInput()"' + '[ngClass]="{' + '\'ng-dirty ng-invalid\' : error && errors[0]?.field ===\'' + field.name + '\'} "';
                    result = result + getTextareaHtml(textarea);
                    result = result + '<p *ngIf="error && errors[0]?.field === \'' + field.name + '\'" class="text-danger">{{errors[0]?.message}}</p>';
                }
                const checkbox: Checkbox = Reflect.getMetadata('Checkbox', this, field.name);
                if (checkbox) {
                    checkbox.rest = (checkbox.rest ? checkbox.rest : '') + '[(ngModel)]="' + this.constructor.name.toLowerCase() + '.' + field.name + '\'" (input)="onInput()"' + '[ngClass]="{\'' + '\'ng-dirty ng-invalid\' : error && errors[0]?.field ===\'' + field.name + '\'} "';
                    result = result + getCheckboxHtml(checkbox);
                    result = result + '<p *ngIf="error && errors[0]?.field === \'' + field.name + '\'" class="text-danger">{{errors[0]?.message}}</p>';
                }
                const radio: Radio = Reflect.getMetadata('Radio', this, field.name);
                if (radio) {
                    radio.rest = (radio.rest ? radio.rest : '') + '[(ngModel)]="' + this.constructor.name.toLowerCase() + '.' + field.name + '" (input)="onInput()"' + '[ngClass]="{' + '\'ng-dirty ng-invalid\' : error && errors[0]?.field ===\'' + field.name + '\'} "';
                    result = result + getRadioHtml(radio);
                    result = result + '<p *ngIf="error && errors[0]?.field === \'' + field.name + '\'" class="text-danger">{{errors[0]?.message}}</p>';
                }
                const select: Select = Reflect.getMetadata('Select', this, field.name);
                if (select) {
                    select.rest = (select.rest ? select.rest : '') + '[(ngModel)]="' + this.constructor.name.toLowerCase() + '.' + field.name + '" (input)="onInput()"' + '[ngClass]="{' + '\'ng-dirty ng-invalid\' : error && errors[0]?.field ===\'' + field.name + '\'} "';
                    result = result + getSelectHtml(select);
                    result = result + '<p *ngIf="error && errors[0]?.field === \'' + field.name + '\'" class="text-danger">{{errors[0]?.message}}</p>';
                }
                
            }
            result = result + '<button pButton label="Submit" [loading]="isLoading"></button>' + getCloseFormHtml() + '</div></div></div>';
        }
        return result;
    }

    public getReadHtml(): string {

        function getSearch(object: object): string {
            let result = '<ng-template pTemplate="caption"><p-accordion><p-accordionTab header="Recherche" [selected]="false" class="line-height-3 m-0">';
            const fields = getFields(object);
            for (const field of fields) {
                const listAnnotation = Reflect.getMetadata('List', object, field.name);
                if (listAnnotation) {
                    if (listAnnotation.type == 'simple') {
                        if (Reflect.getMetadata('LabelInput', object, field.name)) {
                            const labelInput: LabelInput = Reflect.getMetadata('LabelInput', object, field.name);
                            labelInput.restString = (labelInput.restString ? labelInput.restString : '') + '[(ngModel)]="' + object.constructor.name.toLowerCase() + 'Search.' + field.name + '" (input)="rechercher()"';
                            result = result + getLabelInputHtml(labelInput);
                        }
                        else if (Reflect.getMetadata('Select', object, field.name)) {
                            const select: Select = Reflect.getMetadata('Select', object, field.name);
                            select.rest = (select.rest ? select.rest : '') + '[(ngModel)]="' + object.constructor.name.toLowerCase() + 'Search.' + field.name + '" (change)="rechercher()"';
                            result = result + getSelectHtml(select);
                        }
                        else if (Reflect.getMetadata('Radio', object, field.name)) {
                            const radio: Radio = Reflect.getMetadata('Radio', object, field.name);
                            radio.rest = (radio.rest ? radio.rest : '') + '[(ngModel)]="' + object.constructor.name.toLowerCase() + 'Search.' + field.name + '" (change)="rechercher()"';
                            result = result + getRadioHtml(radio);
                        }
                        else if (Reflect.getMetadata('Checkbox', object, field.name)) {
                            const checkbox: Checkbox = Reflect.getMetadata('Checkbox', object, field.name);
                            checkbox.rest = (checkbox.rest ? checkbox.rest : '') + '[(ngModel)]="' + object.constructor.name.toLowerCase() + 'Search.' + field.name + '" (change)="rechercher()"';
                            result = result + getCheckboxHtml(checkbox);
                        }
                        else if (Reflect.getMetadata('Textarea', object, field.name)) {
                            const textarea: Textarea = Reflect.getMetadata('Textarea', object, field.name);
                            textarea.rest = (textarea.rest ? textarea.rest : '') + '[(ngModel)]="' + object.constructor.name.toLowerCase() + 'Search.' + field.name + '" (input)="rechercher()"';
                            result = result + getTextareaHtml(textarea);
                        }
                    }
                }
            }
            result = result + '</p-accordionTab></p-accordion></ng-template>';
            return result;
        }

        function getList(object: object): string {
            const fields = getFields(object);
            let result = '<ng-template pTemplate="header"><tr>';
            for (const field of fields) {
                const listAnnotation = Reflect.getMetadata('List', object, field.name);
                if (listAnnotation) {
                    result = result + getTitleHtml(listAnnotation) + '\n';
                }
            }
            result = result + '<th>Actions</th>';
            result = result + '</tr></ng-template>';
            result = result + '<ng-template pTemplate="body" let-' + object.constructor.name.toLowerCase() + '>';
            result = result + '<tr>';
            for (const field of fields) {
                const listAnnotation = Reflect.getMetadata('List', object, field.name);
                if (listAnnotation) {
                    result = result + '<td>{{' + object.constructor.name.toLowerCase() + '.' + field.name + '}}</td>';
                }
            }
            result = result + '<td><div class="flex"><button pButton pRipple icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" label="Modifier"></button><button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-danger" label="Supprimer"></button></div></td>';
            result = result + '</tr>';
            result = result + '</ng-template>';
            return result;
        }

        return '<div class="grid"><div class="col-12"><div class="card"><h5>Liste de ' + this.constructor.name + '</h5><p-table [value]="' + this.constructor.name.toLowerCase() + 's" [paginator]="true" [rows]="10">' + getSearch(this) + getList(this) + '</p-table></div>' + this.getHtmlDelete() + this.getHtmlUpdate() + '</div></div>';

    }

    public getTsCreate(): string {
        let result = '';
        result = result + 'import { MessageService } from "primeng/api";\n';
        result = result + 'import {HttpResponseApi} from "../../../interfaces/http/HttpResponseApi";\n';
        result = result + 'import { Router } from "@angular/router";\n';
        result = result + 'import { Component, OnInit } from "@angular/core";\n';
        result = result + 'import { ' + this.constructor.name + ' } from "../../../models/' + this.constructor.name.toLowerCase() + '.model";\n';
        result = result + 'import { ' + this.constructor.name + 'Service } from "../../../services/' + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.service";\n';
        result = result + '@Component({\n';
        result = result + '    selector: "create-' + this.constructor.name.toLowerCase() + '",\n';
        result = result + '    templateUrl: "./' + this.constructor.name.toLowerCase() + '.create.page.html",\n';
        result = result + '    styleUrls: ["./' + this.constructor.name.toLowerCase() + '.create.page.css"]\n';
        result = result + '})\n';
        result = result + 'export class Create' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + ' implements OnInit {\n\n';
        
        result = result + 'isLoading: boolean = false;\n';
        result = result + this.constructor.name.toLowerCase() + ': ' + this.constructor.name + ' = new ' + this.constructor.name + '();\n';
        result = result + 'errors: any[]|undefined = [];\n\n';

        result = result + 'constructor(private ' + this.constructor.name.toLowerCase() + 'Service: ' + this.constructor.name + 'Service, private messageService: MessageService,  private router: Router) {}\n\n';

        result = result + 'submit() {\n';
        result = result + 'this.isLoading = true;\n';
        result = result + 'this.' + this.constructor.name.toLowerCase() + 'Service.create' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '(this.' + this.constructor.name.toLowerCase() + ').subscribe(\n';
        result = result + '(response:HttpResponseApi) => {\n';
        result = result + 'if (response.message=="error" && response.status == 422) {\n';
        result = result + 'this.errors = response.data;\n';
        result = result + 'this.isLoading = false;\n';
        result = result + '} else if (response.status == 201) {\n';
        result = result + 'this.router.navigate(["/firstpage"]);\n';
        result = result + '} else {\n';
        result = result + 'this.isLoading = false;\n';
        result = result + 'this.messageService.add({severity:"error",summary:"Erreur",detail: response.message});\n';
        result = result + '}\n';
        result = result + '},\n';
        result = result + '(error) => {\n';
        result = result + 'this.isLoading = false;\n';
        result = result + 'console.error(error);\n';
        result = result + '}\n';
        result = result + ')\n';
        result = result + '}\n\n';
        result = result + 'onInput () {\n';
        result = result + 'this.errors = [];\n';
        result = result + '}\n\n';
        result = result + 'ngOnInit(): void {\n\n';
        result = result + '}\n\n';
        result = result + '}';
        return result;
    }

    public getHtmlDelete(): string {
        let result = '';
        result = result  + '<generic-popup title="Suppression de ' + this.constructor.name + '" subtitle="Etes-vous sûr de vouloir cette "' + this.constructor.name.toLowerCase() + ' [show]="showDeletePopup" (handleclose)="CancelDelete' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '()" (validClick)="ValidDelete' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '()" (cancelClick)="CancelDelete"' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + ' >\n';
        result = result + '</generic-popup>\n'
        return result;
    }

    public getHtmlUpdate(): string {
        let result = '<p-dialog [(visible)]="showUpdatePopup" (onHide)="CancelUpdate' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '() " header="Modification de ' + this.constructor.name + '" [modal]="true" [style]="{width: \'450px\'}" class="p-fluid">\n';

        
        result = result + '<ng-template pTemplate="content">\n';

        const fields = getFields(this);

        for (const field of fields) {
            const labelInput: LabelInput = Reflect.getMetadata('LabelInput', this, field.name);

            if (labelInput) {
                labelInput.restString = (labelInput.restString ? labelInput.restString : '') + '[ngClass]="{' + '\'ng-dirty ng-invalid\' : errorUpdate && errorsUpdate[0]?.field ===\'' + field.name + '\'} " (input)="onInput()"' + '[(ngModel)]="' + this.constructor.name.toLowerCase() + 'Update.' + field.name + '"';
                result = result + getLabelInputHtml(labelInput) + '\n';
                result = result + '<p *ngIf="errorUpdate && errorsUpdate[0]?.field ===\'' + field.name + '\'" class="text-danger">{{errorsUpdate[0]?.message}}</p>\n';
            }

            const textarea: Textarea = Reflect.getMetadata('Textarea', this, field.name);

            if (textarea) {
                textarea.rest = (textarea.rest ? textarea.rest : '') + '[ngClass]="{' + '\'ng-dirty ng-invalid\' : errorUpdate && errorsUpdate[0]?.field ===\'' + field.name + '\'} " (input)="onInput()"' + '[(ngModel)]="' + this.constructor.name.toLowerCase() + 'Update.' + field.name + '"';
                result = result + getTextareaHtml(textarea) + '\n';
                result = result + '<p *ngIf="errorUpdate && errorsUpdate[0]?.field ===\'' + field.name + '\'" class="text-danger">{{errorsUpdate[0]?.message}}</p>\n';
            }

            const checkbox: Checkbox = Reflect.getMetadata('Checkbox', this, field.name);

            if (checkbox) {
                checkbox.rest = (checkbox.rest ? checkbox.rest : '') + '[ngClass]="{' + '\'ng-dirty ng-invalid\' : errorUpdate && errorsUpdate[0]?.field ===\'' + field.name + '\'} " (input)="onInput()"' + '[(ngModel)]="' + this.constructor.name.toLowerCase() + 'Update.' + field.name + '"';
                result = result + getCheckboxHtml(checkbox) + '\n';
                result = result + '<p *ngIf="errorUpdate && errorsUpdate[0]?.field ===\'' + field.name + '\'" class="text-danger">{{errorsUpdate[0]?.message}}</p>\n';
            }

            const radio: Radio = Reflect.getMetadata('Radio', this, field.name);

            if (radio) {
                radio.rest = (radio.rest ? radio.rest : '') + '[ngClass]="{' + '\'ng-dirty ng-invalid\' : errorUpdate && errorsUpdate[0]?.field ===\'' + field.name + '\'} " (input)="onInput()"' + '[(ngModel)]="' + this.constructor.name.toLowerCase() + 'Update.' + field.name + '"';
                result = result + getRadioHtml(radio) + '\n';
                result = result + '<p *ngIf="errorUpdate && errorsUpdate[0]?.field ===\'' + field.name + '\'" class="text-danger">{{errorsUpdate[0]?.message}}</p>\n';
            }

            const select: Select = Reflect.getMetadata('Select', this, field.name);

            if (select) {
                select.rest = (select.rest ? select.rest : '') + '[ngClass]="{' + '\'ng-dirty ng-invalid\' : errorUpdate && errorsUpdate[0]?.field ===\'' + field.name + '\'} " (input)="onInput()"' + '[(ngModel)]="' + this.constructor.name.toLowerCase() + 'Update.' + field.name + '"';
                result = result + getSelectHtml(select) + '\n';
                result = result + '<p *ngIf="errorUpdate && errorsUpdate[0]?.field ===\'' + field.name + '\'" class="text-danger">{{errorsUpdate[0]?.message}}</p>\n';
            }
            
        }
        
        result = result + '</ng-template>';


        result = result + '<ng-template pTemplate="footer">\n';
        result = result + '<button pButton pRipple label="Annuler" icon="pi pi-times" class="p-button-text" (click)="CancelUpdate' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '()"></button>\n';
        result = result + '<button pButton pRipple label="Modifier" icon="pi pi-check" class="p-button-text" (click)="ValidUpdate' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '()"></button>\n';
        result = result + '</ng-template>';
        result = result + '</p-dialog>';
        return result;
    }

    public getTsRead(): string {
        let result = '';
        result = result + 'import { MessageService } from "primeng/api";\n';
        result = result + 'import {HttpResponseApi} from "../../../interfaces/http/HttpResponseApi";\n';
        result = result + 'import { Component, OnInit } from "@angular/core";\n';
        result = result + 'import { ' + this.constructor.name + ' } from "../../../models/' + this.constructor.name.toLowerCase() + '.model";\n';
        result = result + 'import { ' + this.constructor.name + 'Service } from "../../../services/' + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.service";\n';
        result = result + '@Component({\n';
        result = result + '    selector: "read-' + this.constructor.name.toLowerCase() + '",\n';
        result = result + '    templateUrl: "./' + this.constructor.name.toLowerCase() + '.read.page.html",\n';
        result = result + '    styleUrls: ["./' + this.constructor.name.toLowerCase() + '.read.page.css"]\n';
        result = result + '})\n';
        result = result + 'export class Read' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + ' implements OnInit {\n\n';

        result = result + this.constructor.name.toLowerCase() + 'Search: ' + this.constructor.name + ' = new ' + this.constructor.name + '();\n';
        result = result + this.constructor.name.toLowerCase() + 's: ' + this.constructor.name + '[] = [];\n\n';
        result = result + this.constructor.name.toLowerCase() + 'Delete: ' + this.constructor.name + ' = new ' + this.constructor.name + '();\n\n';
        result = result + this.constructor.name.toLowerCase() + 'Update: ' + this.constructor.name + ' = new ' + this.constructor.name + '();\n\n';
        result = result + 'loadingButtonUpdate: boolean = true;\n\n';
        result = result + 'showDeletePopup: boolean = false;\n\n';
        result = result + 'showUpdatePopup: boolean = false;\n\n';
        result = result + 'errorsUpdate: any[]|undefined = [];\n\n';

        result = result + 'Update' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '(' + this.constructor.name.toLowerCase() + ': ' + this.constructor.name + '){\n\n';
        result = result + 'this.showUpdatePopup = true;\n';
        result = result + 'this.' + this.constructor.name.toLowerCase() + 'Update = Object.assign({}, ' + this.constructor.name.toLowerCase() + ');\n';
        result = result + '}\n\n';

        result = result + 'CancelUpdate' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '(){\n\n';
        result = result + 'this.showUpdatePopup = false;\n';
        result = result + 'this.errorsUpdate = [];\n';
        result = result + '}\n\n';

        result = result + 'ValidUpdate' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '(){\n\n';
        result = result + 'this.loadingButtonUpdate = true;\n';
        result = result + 'this.' + this.constructor.name.toLowerCase() + 'Service.update' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '(this.' + this.constructor.name.toLowerCase() + 'Update).subscribe(\n';
        result = result + '(response:HttpResponseApi) => {\n';
        result = result + 'if (response.message=="error" && response.status == 422) {\n';
        result = result + 'this.errorsUpdate = response.data;\n';
        result = result + 'this.loadingButtonUpdate = false;\n';
        result = result + '} else if (response.status == 200) {\n';
        result = result + 'this.get' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + 's();\n';
        result = result + 'this.showUpdatePopup = false;\n';
        result = result + 'this.loadingButtonUpdate = false;\n';
        result = result + 'this.messageService.add({severity:"success", summary:"Succès", detail:"Modification effectuée avec succès"});\n';
        result = result + '} else {\n';
        result = result + 'this.loadingButtonUpdate = false;\n';
        result = result + 'this.messageService.add({severity:"error",summary:"Erreur",detail: response.message});\n';
        result = result + '}\n';
        result = result + '},\n';
        result = result + '(error) => {\n';
        result = result + 'this.loadingButtonUpdate = false;\n';
        result = result + 'console.error(error);\n';
        result = result + '}\n';
        result = result + ')\n';
        result = result + '}\n\n';

        result = result + 'onInput(){\n\n';
        result = result + 'this.errorsUpdate = [];\n';
        result = result + '}\n\n';

        result = result + 'ngOnInit(): void {\n\n';
        result = result + " this.get" + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + "s();\n";
        result = result + '}\n\n';
        result = result + 'constructor (private ' + this.constructor.name.toLowerCase() + 'Service: ' + this.constructor.name + 'Service' + ', private messageService: MessageService) {\n\n';
        result = result + '}\n\n';
        
        result = result + 'get' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + 's() {\n\n';
        result = result + 'this.' + this.constructor.name.toLowerCase() + 'Service.read' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '(this.' + this.constructor.name.toLowerCase() + 'Search).subscribe((response: HttpResponseApi) => {\n';
        result = result + 'if (response.data) {\n';
        result = result + 'this.' + this.constructor.name.toLowerCase() + 's = response.data;\n';
        result = result + '}\n';
        result = result + '});\n';
        result = result + '}\n\n';
        result = result + 'rechercher() {\n\n';
        result = result + 'this.get' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + 's();\n';
        result = result + '}\n\n';

        result = result + 'CancelDelete' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '(){\n\n';
        result = result + 'this.showDeletePopup = false;\n';  
        result = result + '}\n\n';  

        result = result + 'Delete' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '(' + this.constructor.name.toLowerCase() + ': ' + this.constructor.name + '){\n\n';
        result = result + 'this.showDeletePopup = true;\n';
        result = result + 'this.' + this.constructor.name.toLowerCase() + 'Delete = ' + this.constructor.name.toLowerCase() + ';\n';
        result = result + '}\n\n';

        result = result + 'ValidDelete' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '(){\n\n';
        result = result + 'this.showDeletePopup = false;\n';
        result = result + 'this.' + this.constructor.name.toLowerCase() + 'Service.delete' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + '(this.' + this.constructor.name.toLowerCase() + 'Delete).subscribe((response: HttpResponseApi) => {\n';
        result = result + 'if (response.status == 200) {\n';
        result = result + 'this.get' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + 's();\n';
        result = result + 'this.messageService.add({severity:"success", summary:"Succès", detail:"Suppression effectuée avec succès"});\n';
        result = result + '}\n';
        result = result + '});\n';
        result = result + '}\n\n';
        result = result + '}';
        return result;
    }

    getTsReadService(): string {
        let result = 'read' + this.constructor.name + '(' + this.constructor.name.toLowerCase() + 'Search: ' + this.constructor.name + '): Observable<HttpResponseApi> {\n';
        result = result + 'let url = BASE_URL + "/' + this.constructor.name.toLowerCase() + '/read";\n';
        result = result + 'let token = this.getToken();\n';
        result = result + 'const httpOptions = {\n';
        result = result + 'headers: new HttpHeaders({\n';
        result = result + "'Content-Type': 'application/json',\n";
        result = result + "'Authorization': `Bearer ${token}`\n";
        result = result + '})\n';
        result = result + '};\n';
        result = result + 'let body = JSON.stringify(' + this.constructor.name.toLowerCase() + 'Search);\n';
        result = result + 'return this.http.post<HttpResponseApi>(url, body, httpOptions);\n';
        result = result + '}';
        return result;
    }

    getTsCreateService(): string {
        let result = 'create' + this.constructor.name + '(' + this.constructor.name.toLowerCase() + ': ' + this.constructor.name + '): Observable<HttpResponseApi> {\n';
        result = result + 'let url = BASE_URL + "/' + this.constructor.name.toLowerCase() + '/create";\n';
        result = result + 'const httpOptions = {\n';
        result = result + 'headers: new HttpHeaders({\n';
        result = result + "'Content-Type': 'application/json'\n";
        result = result + '})\n';
        result = result + '};\n';
        result = result + 'let body = JSON.stringify(' + this.constructor.name.toLowerCase() + ');\n';
        result = result + 'return this.http.post<HttpResponseApi>(url, body, httpOptions);\n';
        result = result + '}';
        return result;
    }

    getTsUpdateService(): string {
        let result = 'update' + this.constructor.name + '(' + this.constructor.name.toLowerCase() + ': ' + this.constructor.name + '): Observable<HttpResponseApi> {\n';
        result = result + 'let url = BASE_URL + "/' + this.constructor.name.toLowerCase() + '/update";\n';
        result = result + 'const httpOptions = {\n';
        result = result + 'headers: new HttpHeaders({\n';
        result = result + "'Content-Type': 'application/json'\n";
        result = result + '})\n';
        result = result + '};\n';
        result = result + 'let body = JSON.stringify(' + this.constructor.name.toLowerCase() + ');\n';
        result = result + 'return this.http.post<HttpResponseApi>(url, body, httpOptions);\n';
        result = result + '}';
        return result;
    }

    getTsDeleteService(): string {
        let result = '';
        result = result + 'delete' + this.constructor.name + '(' + this.constructor.name.toLowerCase() + ': ' + this.constructor.name + '): Observable<HttpResponseApi> {\n';
        result = result + 'let url = BASE_URL + "/' + this.constructor.name.toLowerCase() + '/delete";\n';
        result = result + 'let token = this.getToken();\n';
        result = result + 'const httpOptions = {\n';
        result = result + 'headers: new HttpHeaders({\n';
        result = result + "'Content-Type': 'application/json',\n";
        result = result + "'Authorization': `Bearer ${token}`\n";
        result = result + '}),\n';
        result = result + 'body: {_id: ' + this.constructor.name.toLowerCase() + '._id}\n';
        result = result + '};\n';
        result = result + 'return this.http.delete<HttpResponseApi>(url,httpOptions);\n';
        result = result + '}';
        return result;
    }

    public getTsService(): string {
        let result = 'import { Injectable } from "@angular/core";\n';
        result = result + 'import { ' + this.constructor.name + ' } from "../../models/' + this.constructor.name.toLowerCase() + '.model";\n';
        result = result + 'import { HttpClient, HttpHeaders } from "@angular/common/http";\n';
        result = result + 'import { Observable } from "rxjs";\n';
        result = result + 'import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";\n';
        result = result + 'import { BASE_URL } from "../../utils/constante.util";\n';
        result = result + '@Injectable({\n';
        result = result + 'providedIn: "root"\n';
        result = result + '})\n';
        result = result + 'export class ' + this.constructor.name.charAt(0).toUpperCase() + this.constructor.name.slice(1) + 'Service {\n\n';
        result = result + 'constructor(private http: HttpClient) {}\n\n';
        result = result + 'getUserConnecte(): string | null {\n';
        result = result + 'if (typeof window !== "undefined") {\n';
        result = result + 'return localStorage.getItem("user");\n';
        result = result + '}\n';
        result = result + 'return null;\n';
        result = result + '}\n\n';
        result = result + 'getToken() {\n';
        result = result + 'let userConnecte = this.getUserConnecte();\n';
        result = result + 'if (userConnecte) {\n';
        result = result + 'let token = JSON.parse(userConnecte).tokenValue;\n';
        result = result + 'return token;\n';
        result = result + '}\n';
        result = result + 'return "";\n';
        result = result + '}\n\n';
        result = result + this.getTsCreateService() + '\n\n';
        result = result + this.getTsReadService() + '\n\n';
        result = result + this.getTsUpdateService() + '\n\n';
        result = result + this.getTsDeleteService() + '\n\n';
        result = result + '}';
        return result;
    }

    public getCreateTsModule(): string {
        let result = '';
        result = result + 'import { NgModule } from "@angular/core";\n';
        result = result + 'import { CommonModule } from "@angular/common";\n';
        result = result + 'import { Create' + this.constructor.name + ' } from "./' + this.constructor.name.toLowerCase() + '.create";\n';
        result = result + 'import { RadioButtonModule } from "primeng/radiobutton";\n';
        result = result + 'import { InputTextModule } from "primeng/inputtext";\n';
        result = result + 'import { FormsModule, ReactiveFormsModule } from "@angular/forms";\n';
        result = result + 'import { ButtonModule } from "primeng/button";\n';
        result = result + 'import { InputTextareaModule } from "primeng/inputtextarea";\n';
        result = result + 'import { DropdownModule } from "primeng/dropdown";\n';
        result = result + 'import { CheckboxModule } from "primeng/checkbox";\n';
        result = result + 'import { MultiSelectModule } from "primeng/multiselect";\n';
        result = result + 'import { AppLayoutModule } from "../../../components/layout/app.layout.module";\n';
        result = result + 'import { PasswordModule } from "primeng/password";\n';
        result = result + 'import { ToastModule } from "primeng/toast";\n';
        result = result + '@NgModule({\n';
        result = result + 'declarations: [\n';
        result = result + 'Create' + this.constructor.name + '\n';
        result = result + '],\n';
        result = result + 'imports: [\n';
        result = result + 'CommonModule,\n';
        result = result + 'FormsModule,\n';
        result = result + 'ReactiveFormsModule,\n';
        result = result + 'AppLayoutModule,\n';
        result = result + 'InputTextModule,\n';
        result = result + 'ButtonModule,\n';
        result = result + 'InputTextareaModule,\n';
        result = result + 'DropdownModule,\n';
        result = result + 'RadioButtonModule,\n';
        result = result + 'CheckboxModule,\n';
        result = result + 'MultiSelectModule,\n';
        result = result + 'PasswordModule,\n';
        result = result + 'ToastModule,\n';
        result = result + ']\n';
        result = result + '})\n';
        result = result + 'export class Create' + this.constructor.name + 'Module { }\n';
        return result;
    }


    public getReadTsModule(): string { 
        let result = '';
        result = result + 'import { NgModule } from "@angular/core";\n';
        result = result + 'import { CommonModule } from "@angular/common";\n';
        result = result + 'import { TableModule } from "primeng/table";\n';
        result = result + 'import { Read' + this.constructor.name + ' } from "./' + this.constructor.name.toLowerCase() + '.read";\n';
        result = result + 'import { ButtonModule } from "primeng/button";\n';
        result = result + 'import { RippleModule } from "primeng/ripple";\n';
        result = result + 'import { InputTextModule } from "primeng/inputtext";\n';
        result = result + 'import { AccordionModule } from "primeng/accordion";\n';
        result = result + 'import { DropdownModule } from "primeng/dropdown";\n';
        result = result + 'import { ToastModule } from "primeng/toast";\n';
        result = result + 'import { GenericPopupModule } from "../../../components/generic-popup/generic-popup.module";\n';
        result = result + 'import { FormsModule } from "@angular/forms";\n';
        result = result + 'import { InputTextareaModule } from "primeng/inputtextarea";\n';
        result = result + 'import { DialogModule } from "primeng/dialog";\n';
        result = result + '@NgModule({\n';
        result = result + 'declarations: [\n';
        result = result + 'Read' + this.constructor.name + '\n';
        result = result + '],\n';
        result = result + 'imports: [\n';
        result = result + 'CommonModule,\n';
        result = result + 'FormsModule,\n';
        result = result + 'TableModule,\n';
        result = result + 'ButtonModule,\n';
        result = result + 'RippleModule,\n';
        result = result + 'InputTextModule,\n';
        result = result + 'AccordionModule,\n';
        result = result + 'DropdownModule,\n';
        result = result + 'ToastModule,\n';
        result = result + 'GenericPopupModule,\n';
        result = result + 'InputTextareaModule,\n';
        result = result + 'DialogModule,\n';
        result = result + ']\n';
        result = result + '})\n';
        result = result + 'export class Read' + this.constructor.name + 'Module { }\n';
        return result;
    }


    public setTsService(){
        writeToFile(process.cwd() + SERVICE_PATH + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.service.ts', this.getTsService());
    }

    public setTs(){
        writeToFile(process.cwd() + PAGE_PATH + this.constructor.name.toLowerCase() + '/create-' + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.create.ts', this.getTsCreate());
        writeToFile(process.cwd() + PAGE_PATH + this.constructor.name.toLowerCase() + '/read-' + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.read.ts', this.getTsRead());
    }

    public setHtml(){
        writeToFile(process.cwd() + PAGE_PATH + this.constructor.name.toLowerCase() + '/create-' + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.create.page.html', this.getCreateHtml());
        writeToFile(process.cwd() + PAGE_PATH + this.constructor.name.toLowerCase() + '/create-' + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.create.page.css', "");
        writeToFile(process.cwd() + PAGE_PATH + this.constructor.name.toLowerCase() + '/read-' + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.read.page.html', this.getReadHtml());
        writeToFile(process.cwd() + PAGE_PATH + this.constructor.name.toLowerCase() + '/read-' + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.read.page.css', "");
    }

    public setModule(){
        writeToFile(process.cwd() + PAGE_PATH + this.constructor.name.toLowerCase() + '/create-' + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.create.module.ts', this.getCreateTsModule());
        writeToFile(process.cwd() + PAGE_PATH + this.constructor.name.toLowerCase() + '/read-' + this.constructor.name.toLowerCase() + '/' + this.constructor.name.toLowerCase() + '.read.module.ts', this.getReadTsModule());
    }

    public generateCRUD(){
        this.setTs();
        this.setHtml();
        this.setTsService();
        this.setModule();
    }

}