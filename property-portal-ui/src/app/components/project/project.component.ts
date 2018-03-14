import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProjectModel } from './shared/project.model'
import { LocalStorageService } from '../../core/shared/services/index';
import { ProjectService } from './shared/project.service';
import { ProjectSharedService } from '../../shared/project-shared.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  // styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public projects: Array<ProjectModel> = []

  constructor(
    private localStorageService: LocalStorageService,
    private projectService: ProjectService,
    private router: Router,
    private projectSharedService: ProjectSharedService
  ) { }

  ngOnInit() {
    const currentUser = this.localStorageService.getCurrentUser();
    this.getJob(currentUser.userDetails.CustomerID);
    this.projectSharedService.changeNav(new ProjectModel);
  }

  getJob(CustomerID) {
    this.projectService.getJob(CustomerID).then(result => {
      this.projects = result.data;
    })
  }

  public onClickProject(project): void {
    this.localStorageService.setProjectName(project.LeadName);
    this.router.navigate(['/project/' + project.JobId + '/safety']);
  }
}
