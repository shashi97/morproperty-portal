import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import { MapViewComponent } from './mapview.component';


export const mapviewRoutes: Routes = [
    {
        path: 'mapview',

        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: MapViewComponent,
            }
        ]
    }
];
export const mapviewRouting: ModuleWithProviders = RouterModule.forChild(mapviewRoutes);