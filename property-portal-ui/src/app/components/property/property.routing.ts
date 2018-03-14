import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';

import { VirtualTourComponent } from './index';

import { PropertyImageComponent, PropertyComponent, PropertyProjectComponent } from './index';
import {TeamResolver} from './shared/property-image-resolve.service';

export const propertyRoutes: Routes = [
  {
    path: 'property',

    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PropertyComponent,
      },
      {
        path: 'dashboard',
        component: PropertyComponent,
      },
      {
        path: ':propertyId/virtualtour',
        component: VirtualTourComponent

      },

      {

        path: ':propertyId/image',
        component: PropertyImageComponent,
        resolve: {
          team: TeamResolver
        }
      },
      {
        path: ':propertyId/project',
        component: PropertyProjectComponent
      }
    ]
  }
];
export const propertyRouting: ModuleWithProviders = RouterModule.forChild(propertyRoutes);