import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { VueloRoutingModule } from './vuelo-routing.module';
import { VueloComponent, VueloCreateComponent, VueloEditComponent } from './vuelo.component';
import { VueloService } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        VueloRoutingModule
    ],
    providers: [
        VueloService
    ],
    declarations: [
        VueloComponent,
        VueloCreateComponent,
        VueloEditComponent
    ]
})
export class VueloModule { }
