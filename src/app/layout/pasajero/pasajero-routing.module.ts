import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasajeroComponent, PasajeroCreateComponent, PasajeroEditComponent } from './pasajero.component';

const routes: Routes = [
    {
        path: '',
        component: PasajeroComponent
    },
    {
        path: 'create',
        component: PasajeroCreateComponent
    },
    {
        path: 'edit/:id',
        component: PasajeroEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PasajeroRoutingModule {}
