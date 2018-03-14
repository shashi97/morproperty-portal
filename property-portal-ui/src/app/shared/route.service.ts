// Import Injectable Decorator
import { Injectable, OnInit } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { LeftMenu } from '../components/shared/models/left-navbar.model';
import { DefaultRole, UserTypeEnum } from '../components/shared/enums/base.enum';
import { LocalStorageService } from '../core/shared/services/index';


// Use @Injectable() to declare the RouteService class as an Injectable
@Injectable()
export class RouteService implements OnInit {

  leftMenuItems: Array<LeftMenu> = [];
  user: any;
  userType: string;
  constructor(public router: Router,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
  }

  activateLeftMenu(leftMenus: LeftMenu[], snapshotUrls: UrlSegment[]) {
    let url = '';
    snapshotUrls.forEach(function (urlSegment) {
      url = url + '/' + urlSegment.path;
    });
    let moduleName = this.localStorageService.getModuleName();
    let topMenu = this.localStorageService.getTopMenu();
    topMenu = topMenu.split('/')[0];
    leftMenus.forEach(function (val) {
      if ('/' + val.sref === '/' + topMenu + url) {
        val.isActive = true;
      } else {
        val.isActive = false;
      }
    })
    this.leftMenuItems = leftMenus;
    return leftMenus;
  }



  openRoute(stateUrl) {
    this.router.navigate(['/' + stateUrl]);
  }

  topModuleMenus(moduleName) {
    let arr = [];
    switch (moduleName) {
      case 'property':
        arr = [{ title: 'Property', sref: 'property', defaultMenu: 'dashboard' },
        { title: 'virtualtour', sref: 'property/virtualtour', DefaultMenu: 'virtualtour' },
        { title: 'Image', sref: 'property/image', defaultMenu: 'image' },
        { title: 'Project', sref: 'property/project', defaultMenu: 'project' }];
        break;
      case 'project':
        arr = [{ title: 'Project', sref: 'project', defaultMenu: 'dashboard' },
        { title: 'Safety', sref: 'project/safety', defaultMenu: 'safety' },
        { title: 'Whos on the Site', sref: 'project/onsite', defaultMenu: 'onsite' },
        { title: 'QA/Forms', sref: 'project/form', defaultMenu: 'form' }];
        break;

       case 'mapview':
        arr = [{ title: 'Project', sref: 'mapview', defaultMenu: '' }]
        break;

    }
    return arr;
  }

  topMenues() {
    return [{ headerName: 'Map View', name: 'mapview', isActive: false, href: '/mapview' },
    { headerName: 'My Projects', name: 'project', isActive: false, href: '/project' },
    { headerName: 'My Properties', name: 'property', isActive: false, href: '/property' },
    { headerName: 'Reports', name: 'Reports', isActive: false },
    { headerName: 'Alerts', name: 'Alerts', isActive: false }]
  }

  selectTopMenu(selectedTpMenu) {
    let menus = this.topMenues();
    menus.map(res => {
      if (res.name === selectedTpMenu[0].path) {
        res.isActive = true;
      } else {
        res.isActive = false;
      }
    })
    return menus;
  }
}
