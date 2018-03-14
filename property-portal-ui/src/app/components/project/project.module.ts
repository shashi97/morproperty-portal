import { NgModule } from '@angular/core';
import { SharedComponentModule } from '../shared/shared-component.module';
import { ProjectService } from './shared/project.service'
import { projectRouting } from './project.routing';
import {
  ProjectComponent,
  ProjectOnsiteComponent,
  ProjectLeftNavbarComponent,
  ProjectNameComponent,
  ProjectSafetyComponent,
  QAFormComponent
} from './index';


@NgModule({
  imports: [
    projectRouting,
    SharedComponentModule,
  ],
  declarations: [
    ProjectComponent,
    ProjectOnsiteComponent,
    ProjectLeftNavbarComponent,
    ProjectNameComponent,
    ProjectSafetyComponent,
    QAFormComponent
  ],
  providers: [
    ProjectService
  ]
})

export class ProjectModule { }
