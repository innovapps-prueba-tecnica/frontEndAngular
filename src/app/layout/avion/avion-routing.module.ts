import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvionComponent, AvionCreateComponent, AvionEditComponent } from './avion.component';

const routes: Routes = [
    {
        path: '',
        component: AvionComponent
    },
    {
        path: 'create',
        component: AvionCreateComponent
    },
    {
        path: 'edit/:id',
        component: AvionEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AvionRoutingModule {}
