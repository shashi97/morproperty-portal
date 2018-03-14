import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ActivatedRoute } from '@angular/router';
import { OnSiteModel } from '../shared/project.model';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-project-onsite',
  templateUrl: './project-onsite.component.html',
  // styleUrls: ['./project-onsite.component.css']
})
export class ProjectOnsiteComponent implements OnInit {
  public projectId: number;
  public projectOnsiteList: Array<OnSiteModel> = [];
  public image: any = new Image();
  constructor(
    private projectService: ProjectService,
    public route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
  }


  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'] || 0;
    if (this.projectId !== 0) {
      this.getProjectOnsiteList();
    }
  }

  public getProjectOnsiteList(): void {
    this.projectService.getProjectOnsiteList(this.projectId).then(result => {
      this.projectOnsiteList = result.data;
      this.projectOnsiteList.forEach(item => {
        // if (item.EndTime === '0:00') {
        //   item.EndTime = 'null';
        // }

        if (item.EmployeeImage) {
          item.EmployeeImage = btoa(new Uint8Array(item.EmployeeImage.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        }
      })
    });

  }

  onSrc(image) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + image);
  }

}
