
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'app-property-left-navbar',
  templateUrl: './property-left-navbar.component.html',
  // styleUrls: ['./property-left-navbar.component.css']
})
export class PropertyLeftNavbarComponent implements OnInit {
  leftMenuItem;
  leftMenuItems = [];
  folderName = '';
  propertyId: number;
  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {

    this.folderName = 'property';
    this.localStorageService.setTopMenu(this.folderName);
    this.propertyId = this.route.snapshot.params['propertyId'] || 0;


    this.leftMenuItems = [
      { title: 'Virtual Tour', sref: 'property/' + this.propertyId + '/virtualtour', icon: 'users.svg', isActive: false,css: 'fa fa-gamepad', divCss: 'icon-active icon-item' },
      { title: 'Images', sref: 'property/' + this.propertyId + '/image', icon: 'users.svg', isActive: false,css: 'fa fa-picture-o', divCss: 'icon-item' },
      { title: 'Projects', sref: 'property/' + this.propertyId + '/project', icon: 'user-info.svg', isActive: false, css: 'fa fa-home', divCss: 'icon-item' }
    ];
    let menuDetail: any = this.localStorageService.getPropertyLeftMenu();
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

  openComponent(item) {
    this.leftMenuItem = item.css;
    this.routeService.openRoute(item.sref);
    this.localStorageService.setPropertyLeftMenu(this.leftMenuItem);
  }
}
