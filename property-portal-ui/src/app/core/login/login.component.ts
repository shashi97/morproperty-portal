import { Component, OnInit, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, LocalStorageService } from '../shared/services/index';
import { RouteService } from '../../shared';
import { CommonService } from '../shared/services/common.service';
import { Token, Login } from './login.model';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit {
  public messages: Array<Message> = []
  model: Login = new Login();
  loading = false;
  returnUrl: string;
  token: Token;
  isUserNameEmpty: boolean = false;
  isPasswordEmpty: boolean = false;
  isSubmit: boolean = false;
  isInvalid: boolean = false;
  err: any;
  public message: string;
  public defaultMenu: string = '';
  public moduleName: string = 'mapview';
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public routeService: RouteService,
    private commonService: CommonService,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService) {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === "NumpadEnter") {
      this.login();
    }
  }
  ngOnInit() {

    this.message = this.route.snapshot.params['message'];
    let currentUser = this.localStorageService.getCurrentUser();
    if (currentUser) {
      if (this.localStorageService.getModuleName()) {
        this.moduleName = this.localStorageService.getModuleName();

        let selectedModule = this.routeService.topModuleMenus(this.moduleName);
        if (selectedModule) {
          this.defaultMenu = selectedModule[0].defaultMenu;
        }
      }

      this.returnUrl = this.checkUserRole();
      this.router.navigate([this.returnUrl]);
    } else {
      // reset login status
      this.localStorageService.removeLogin();
      this.returnUrl = '/' + this.moduleName + '/' + this.defaultMenu;
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrl;
    }

  }

  checkUserRole() {
    return '/' + this.moduleName + '/' + this.defaultMenu;
  }

  login() {
    this.isInvalid = false;
    this.isUserNameEmpty = false;
    this.isPasswordEmpty = false;
    this.isSubmit = false;
    if (this.model.UserName === '') {
      // this.messages.push({ severity: 'warn', summary: '', detail: 'UserName required!' });
      this.isUserNameEmpty = true;
      this.isSubmit = true;
    }
    if (this.model.Password === '') {
      // this.messages.push({ severity: 'warn', summary: '', detail: 'Password required!' });
      this.isPasswordEmpty = true;
      this.isSubmit = true;
    }

    if (this.isUserNameEmpty || this.isPasswordEmpty) {
      return ;
    }

    this.loading = true;
    if (!this.isSubmit) {
      this.authenticationService.login(this.model.UserName, this.model.Password).then(result => {
        this.token = result.data;
        if (this.token && this.token.token) {
          this.localStorageService.setCurrentUser(this.token);
        }
        this.setCurrentUser()

      }).catch(error => {
        this.isInvalid = true;
        this.loading = false;
        this.err = 'Invalid username or password';
        // this.messages.push({ severity: 'error', summary: '', detail: this.err });
      });
    }
  }

  setCurrentUser() {
    this.returnUrl = this.checkUserRole();
    let splitUrl = this.returnUrl.split('/')[1];
    if (splitUrl) {
      this.localStorageService.setModuleName(splitUrl);
    }
    this.router.navigate([this.returnUrl]);
    this.loading = false;
  }

  public routeForReset() {
    this.router.navigate(['forgot']);
  }
}
