import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AvionRoutingModule } from './avion-routing.module';
import { AvionComponent, AvionCreateComponent, AvionEditComponent } from './avion.component';
import { AvionService } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        AvionRoutingModule
    ],
    providers: [
        AvionService
    ],
    declarations: [
        AvionComponent,
        AvionCreateComponent,
        AvionEditComponent
    ]
})
export class AvionModule { }
