import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TiquetesRoutingModule } from './tiquetes-routing.module';
import { TiquetesComponent, TiquetesCreateComponent, TiquetesEditComponent } from './tiquetes.component';
import { TiqueteService, AvionService, PasajeroService, VueloService } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        TiquetesRoutingModule
    ],
    providers: [
        TiqueteService,
        AvionService,
         PasajeroService,
        VueloService
    ],
    declarations: [
        TiquetesComponent,
        TiquetesCreateComponent,
        TiquetesEditComponent
    ]
})
export class TiquetesModule { }
