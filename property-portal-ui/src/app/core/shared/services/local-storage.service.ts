import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  public getCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return null;
    }
  }



  public getUserDetail() {
    let user = this.getCurrentUser();
    if (user) {
      return user.User;
    }
    return null;
  }

  public getAccessToken(): string {
    let currentUser = this.getCurrentUser();
    if (currentUser) {
      return 'Bearer ' + currentUser.token;
    }
    return '';
  }



  public setCurrentUser(token) {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(token));

  }

  public getModuleName() {
    return localStorage.getItem('moduleName');
  }

  public setModuleName(moduleName: string) {
    localStorage.setItem('moduleName', moduleName);
  }


  public getProjectName() {
    return localStorage.getItem('projectName');
  }

  public setProjectName(projectName: string) {
    localStorage.setItem('projectName', projectName);
  }


  public getTopMenu() {
    if (localStorage.getItem('selectedTopMenu')) {
      return localStorage.getItem('selectedTopMenu');
    } else {
      return '';
    }
  }

  public setTopMenu(selectedTopMenu: string) {
    localStorage.setItem('selectedTopMenu', selectedTopMenu);
  }
  public setProjectLeftMenu(projectLeftMenu) {
    localStorage.setItem('projectLeftMenu', projectLeftMenu);
  }
  public getProjectLeftMenu() {
    return localStorage.getItem('projectLeftMenu');
  }
  public setPropertyLeftMenu(projectLeftMenu) {
    localStorage.setItem('propertyLeftMenu', projectLeftMenu);
  }
  public getPropertyLeftMenu() {
    return localStorage.getItem('propertyLeftMenu');
  }
  public removeSelectedLeftMenu(){
    localStorage.removeItem('projectLeftMenu');
    localStorage.removeItem('propertyLeftMenu');
  }

  public removeLogin() {
    // remove user from local storage to log user out
    localStorage.removeItem('labLogo');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('moduleName');
    localStorage.removeItem('selectedTopMenu');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('projectLeftMenu');
    localStorage.removeItem('propertyLeftMenu');
    localStorage.removeItem('projectName');
    localStorage.removeItem('Authorization');
    localStorage.removeItem('userId');
    
  }
}
