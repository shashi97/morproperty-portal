import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  CommonService,
  BreadcrumbsService,
  LocalStorageService
} from '../shared/services/index';
import { Message } from 'primeng/primeng';
import { RouteService } from '../../shared/';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  // styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  user: any = {};
  labDDO = [];
  currentTime: Date;
  public showDialog: boolean = false;
  searchLab: string = '';
  public logo: string = '';
  // public labs: Array<LabModel> = [];
  public labId: number = 0;
  public headerName: string = '';
  public practiceName: string = '';
  breadcrumbs: string = 'No breadcrumbs';
  private subscription: Subscription;
  public errorMsg: Message[] = [];
  public loggedAsAdmin: boolean = false;
  public headerMenu: Array<any> = [];
  public isShow: boolean = true;
  isShowDropdown: boolean = true;
  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private breadcrumbsService: BreadcrumbsService,
    private commonService: CommonService,
    public route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    public routeService: RouteService) {
  }

  ngOnInit() {

    if (this.localStorageService.getCurrentUser()) {
      this.headerMenu = this.routeService.selectTopMenu(this.route.snapshot.url);
      let loggedUser = this.localStorageService.getCurrentUser();
      this.user = loggedUser.User;
    } else {
      this.user = this.localStorageService.getUserDetail();
    }

    $(document).ready(function(){
      
      $(".toggle-horizontal-mob").height( $(window).height() - 75 );
      
      
      $(window).resize(function () {
          $(".toggle-horizontal-mob").height( $(window).height() -75 );
         
    
    });
      
      $(".toggle-horizontal-mob").hide();
      
      $(".navbar .horizontal").click(function () {
          $(".toggle-horizontal-mob").animate ({
              left: 'toggle',
              opacity: 'toggle'
          })
    
      });
      
      
      
      
      $(".map .map-project-mob .details i").click(function() {
          $(".map .map-project-mob").hide(100)
      });
      
    
    });

    this.currentTime = new Date();
    // this.getLabDDO();
  }

  public onHorizontalButtonClick() {

    // this.isShow = true;
  }

  public onClickHeaderMenu(header): void {
    // this.isShow = false;
    // document.getElementById("toggle-auto").style.display = 'none';   
    // document.getElementById("toggle-auto-list").style.display = 'none !important';    
    this.router.navigate([header.href]);
    this.localStorageService.removeSelectedLeftMenu();
  }

  public OnImageClick() {
    this.isShowDropdown = !this.isShowDropdown;

  }

  public onSignOut() {
    this.localStorageService.removeLogin();
    this.router.navigate(['/login']);
  }

 
 
  
  
}

