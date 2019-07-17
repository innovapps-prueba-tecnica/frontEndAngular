import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiquetesComponent, TiquetesCreateComponent, TiquetesEditComponent } from './tiquetes.component';

const routes: Routes = [
    {
        path: '',
        component: TiquetesComponent
    },
    {
        path: 'crear',
        component: TiquetesCreateComponent
    },
    {
        path: 'edit/:id',
        component: TiquetesEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TiquetesRoutingModule {}
