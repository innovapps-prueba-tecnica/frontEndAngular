import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TiqueteRoutingModule } from './tiquete-routing.module';
import { TiqueteComponent, TiqueteCreateComponent, TiqueteEditComponent } from './tiquete.component';
import { TiqueteService } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        TiqueteRoutingModule
    ],
    providers:[
        TiqueteService
    ],
    declarations: [
        TiqueteComponent,
        TiqueteCreateComponent,
        TiqueteEditComponent
    ]
})
export class TiqueteModule { }
