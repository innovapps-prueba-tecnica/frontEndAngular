import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VueloComponent, VueloCreateComponent, VueloEditComponent } from './vuelo.component';

const routes: Routes = [
    {
        path: '',
        component: VueloComponent
    },
    {
        path: 'create',
        component: VueloCreateComponent
    },
    {
        path: 'edit/:id',
        component: VueloEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VueloRoutingModule {}
