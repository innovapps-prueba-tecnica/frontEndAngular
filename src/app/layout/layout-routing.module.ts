import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'vuelos', pathMatch: 'prefix' },
            { path: 'vuelos', loadChildren: () => import('./vuelo/vuelo.module').then(m => m.VueloModule) },
            { path: 'pasajeros', loadChildren: () => import('./pasajero/pasajero.module').then(m => m.PasajeroModule) },
            { path: 'tiquetes', loadChildren: () => import('./tiquete/tiquete.module').then(m => m.TiqueteModule) },
            { path: 'aviones', loadChildren: () => import('./avion/avion.module').then(m => m.AvionModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
