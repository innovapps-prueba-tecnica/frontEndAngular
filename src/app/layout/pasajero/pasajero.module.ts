import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PasajeroRoutingModule } from './pasajero-routing.module';
import { PasajeroComponent, PasajeroCreateComponent, PasajeroEditComponent } from './pasajero.component';
import { PasajeroService } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        PasajeroRoutingModule
    ],
    providers:[
        PasajeroService
    ],
    declarations: [
        PasajeroComponent,
        PasajeroCreateComponent,
        PasajeroEditComponent
    ]
})
export class PasajeroModule { }
