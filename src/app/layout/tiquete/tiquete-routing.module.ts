import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiqueteComponent, TiqueteCreateComponent, TiqueteEditComponent } from './Tiquete.component';

const routes: Routes = [
    {
        path: '',
        component: TiqueteComponent
    },
    {
        path: 'create',
        component: TiqueteCreateComponent
    },
    {
        path: 'edit/:id',
        component: TiqueteEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TiqueteRoutingModule {}
