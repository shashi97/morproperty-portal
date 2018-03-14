import { Component, OnInit } from '@angular/core';
import { Router, UrlSegment, ActivatedRoute } from '@angular/router';

import { PropertyService } from '../shared/property.service';
import { PropertyModel } from '../shared/property.model';
import {  
  LocalStorageService
} from '../../../core/shared/services/index';

@Component({
  selector: 'app-property-name',
  templateUrl: './property-name.component.html',
  // styleUrls: ['./property-name.component.css']
})
export class PropertyNameComponent {

  public propertyName = 'Ohau Snow Field';
  public propertyId: number;
  public propertyDetail: PropertyModel = new PropertyModel();
  constructor(public router: Router,
    public route: ActivatedRoute,
     private propertyService: PropertyService,
     private localStorageService: LocalStorageService) {

  }

  public onClickBack(): void {
    this.router.navigate(['/property']);
    this.localStorageService.removeSelectedLeftMenu();
  }

  ngOnInit() {
    this.propertyId = this.route.snapshot.params['propertyId'] || 0;
    this.propertyService.getPropertyDetail(Number(this.propertyId)).then(res => {
      this.propertyDetail = res.data[0];
    })

  }

}
