import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ActivatedRoute } from '@angular/router';
import { QAFormsModel } from './QA-form.model';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'app-QA-form',
  templateUrl: './QA-form.component.html',
  styleUrls: ['./QA-form.component.css']
})
export class QAFormComponent implements OnInit {
  public projectId: number;
  public projectOnsiteList: Array<QAFormsModel> = [];
  constructor(
    private localStorageService: LocalStorageService,
    private projectService: ProjectService,
    public route: ActivatedRoute
  ) {
  }



  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'] || 0;
    const user = this.localStorageService.getCurrentUser();
    const jobName = this.localStorageService.getProjectName();
    if (this.projectId !== 0) {
      this.getProjectOnsiteList(this.projectId, user.userDetails.CustomerID, jobName);
    }
  }

  public getProjectOnsiteList(jobId, UserId, jobName): void {
    this.projectService.getQaForms(jobId, UserId).then((result) => {
      this.projectOnsiteList = result.data;
    })
  }

  onAttachmentClick(attachment) {
    window.open(attachment.url);
  }

}
