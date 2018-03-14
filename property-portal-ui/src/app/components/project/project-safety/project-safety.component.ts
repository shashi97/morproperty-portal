import { Component, OnInit, NgModule, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';

import { ProjectService } from '../shared/project.service';
import { ProjectSafetyInductionModel, SafetySchemaModel } from '../shared/project.model';
import { LocalStorageService } from '../../../core/shared/services/local-storage.service';

import { LoaderService } from '../../../core/loader/loader.service';


@Component({
  selector: 'app-project-safety',
  templateUrl: './project-safety.component.html',
  // styleUrls: ['./project-safety.component.css']
})
export class ProjectSafetyComponent implements OnInit {

  public detail: Array<any> = new Array<any>();
  public projectSaftyList: Array<SafetySchemaModel> = new Array<SafetySchemaModel>();
  public projectInductionRegisterList: Array<ProjectSafetyInductionModel> = new Array<ProjectSafetyInductionModel>();

  public projectId: number;
  public image: any = new Image();
  public customerId: number;
  constructor(public route: ActivatedRoute,
    private projectService: ProjectService,
    private localStorageService: LocalStorageService,
    private sanitizer: DomSanitizer,
    private loaderService: LoaderService) {
  }
  ngOnInit() {
    let currentUser = this.localStorageService.getCurrentUser();
    this.customerId = currentUser.userDetails.CustomerID;
    this.projectId = this.route.snapshot.params['projectId'] || 0;
    if (this.projectId !== 0) {
      this.getSafetyDetails();
    }
  }

  public getSafetyDetails(): void {

    this.projectService.getSafetyList(this.customerId, this.projectId).then(result => {

      this.projectSaftyList = result.data;
      if (this.projectSaftyList.length > 0) {
        this.projectSaftyList.map(saftey => {
          saftey.fileType = (saftey.url.trim()).substring((saftey.url.trim()).lastIndexOf('.') + 1);
          switch (saftey.fileType.toLowerCase()) {
            case 'pdf':
              saftey.fileTypeUrl = '../../assets/images/pdf.png';
              break;
            case 'doc':
              saftey.fileTypeUrl = '../../assets/images/doc.png';
              break;
            case 'docx':
              saftey.fileTypeUrl = '../../assets/images/docx.png';
              break;
            case 'xls':
              saftey.fileTypeUrl = '../../assets/images/excel.png';
              break;
            case 'jpg':
              saftey.fileTypeUrl = '../../assets/images/jpg.png';
              break;
            case 'jpeg':
              saftey.fileTypeUrl = '../../assets/images/jpeg.png';
              break;
            case 'png':
              saftey.fileTypeUrl = '../../assets/images/png.png';
              break;
            default:
              saftey.fileTypeUrl = '';
              break;
          }

        })
      }

    });
    this.getInductionDetails();

  }

  public getInductionDetails(): void {
    this.projectInductionRegisterList = [];
    this.projectService.getInductionRegisterList(this.projectId).then(result => {
      this.projectInductionRegisterList = result.data;
      this.projectInductionRegisterList.forEach(list => {
        if (list.EmployeeImage) {
          list.EmployeeImage = btoa(new Uint8Array(list.EmployeeImage.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        }
      })
    });
  }

  onClickProjectSafety(): void {
  }

  onSrc(image) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + image);
  }
}
