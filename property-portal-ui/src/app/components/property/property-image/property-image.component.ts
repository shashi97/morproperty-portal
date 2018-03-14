import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyImageModel } from '../shared/property.model'
import { PropertyService } from '../shared/property.service'
import { LocalStorageService } from '../../../core/shared/services/index';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-property-image',
  templateUrl: './property-image.component.html',
  // styleUrls: ['./property-image.component.css']
})
export class PropertyImageComponent implements OnInit, AfterViewInit {

  public propertyImages: Array<PropertyImageModel> = new Array<PropertyImageModel>();
  public p: Array<any> = [];
  public data: string = '';
  public propertyId: number;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private propertyService: PropertyService,
    private localStorageService: LocalStorageService
  ) {
    let currentUser = this.localStorageService.getCurrentUser();
    this.propertyId = this.route.snapshot.params['propertyId'] || 0;

  }


  ngOnInit() {

    this.propertyId = this.route.snapshot.params['propertyId'] || 0;
    const propertyImageList: any = this.route.snapshot;
    this.propertyImages = propertyImageList.data.team.data;


  }

  ngAfterViewInit() {
     $("#gallery").unitegallery({
    //   grid_space_between_cols: 0,
    //   grid_space_between_rows: 0,
    //   tile_enable_border: false,
    //   tile_enable_shadow: false,
    //   grid_padding: 0,
    //   tile_width: 250,
     });


  }
}
