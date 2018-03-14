import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import { ProjectComponent } from './index';
import { ProjectOnsiteComponent, ProjectSafetyComponent , QAFormComponent} from './index'

export const projectRoutes: Routes = [
  {
    path: 'project',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjectComponent,
      },
      {
        path: 'dashboard',
        component: ProjectComponent,
      },
      {
        path: ':projectId/onsite',
        component: ProjectOnsiteComponent
      },
      {
        path: ':projectId/safety',
        component: ProjectSafetyComponent
      },
      {
        path:':projectId/QA-form',
        component:QAFormComponent
      }
    ]
  }
];
export const projectRouting: ModuleWithProviders = RouterModule.forChild(projectRoutes);
