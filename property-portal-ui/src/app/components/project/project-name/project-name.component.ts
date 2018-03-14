import { Component, OnInit, Input } from '@angular/core';
import { Router, UrlSegment, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../shared/project.service';
import {ProjectModel} from '../shared/project.model';
import {  
  LocalStorageService
} from '../../../core/shared/services/index';
@Component({
    selector: 'app-project-name',
    templateUrl: './project-name.component.html',
    // styleUrls: ['./project-name.component.css']
})
export class ProjectNameComponent implements OnInit {
    public projectName = 'Ohau Snow Field';
    public projectDetail: ProjectModel = new ProjectModel(); 
    public projectId: number;
    constructor(public router: Router, 
        private projectService: ProjectService,
        public route: ActivatedRoute,
        private localStorageService: LocalStorageService) {

    }

    public onClickBack(): void {
        this.router.navigate(['/project']);
        this.localStorageService.removeSelectedLeftMenu();
    }
    ngOnInit() {
        this.projectId = this.route.snapshot.params['projectId'] || 0;
        this.projectService.getProjectDetail(Number(this.projectId)).then(res=>{
            this.projectDetail = res.data[0];
        })

    }


}
