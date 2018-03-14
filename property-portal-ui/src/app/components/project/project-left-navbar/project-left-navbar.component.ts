
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'app-project-left-navbar',
  templateUrl: './project-left-navbar.component.html',
  // styleUrls: ['./project-left-navbar.component.css']
})
export class ProjectLeftNavbarComponent implements OnInit {
  leftMenuItem;
  leftMenuItems = [];
  folderName = '';
  id = 0;
  projectId = 0;
  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {

    this.folderName = 'project';
    this.localStorageService.setTopMenu(this.folderName);

    this.projectId = this.route.snapshot.params['projectId'];

    this.leftMenuItems = [
      { title: 'Safety', sref: 'project/' + this.projectId + '/safety', icon: 'users.svg', isActive: false, css: 'fa fa-hand-o-right', divCss: 'icon-active icon-item' },
      { title: 'Whos on the Site', sref: 'project/' + this.projectId + '/onsite', icon: 'users.svg', isActive: false, css: 'fa fa-user', divCss: 'icon-item' },
      { title: 'QA/Forms', sref: 'project/' + this.projectId + '/QA-form', icon: 'user-info.svg', isActive: false, css: 'fa fa-question-circle', divCss: 'icon-item' }
    ];
    let menuDetail: any = this.localStorageService.getProjectLeftMenu();
    if (menuDetail) {
      this.leftMenuItems.forEach(element => {
        if (element.css === menuDetail) {
          return element.divCss = "icon-active icon-item";
        } else {
          return element.divCss = "icon-item";
        }
      })
    }

  }

  ngOnInit() {
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  public openComponent(item) {
    this.leftMenuItem = item.css;
    this.routeService.openRoute(item.sref);
    this.localStorageService.setProjectLeftMenu(this.leftMenuItem);
  }
}
