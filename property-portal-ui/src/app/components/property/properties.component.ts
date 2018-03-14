import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyModel } from './shared/property.model'
import { PropertyService } from './shared/property.service'
import { LocalStorageService } from '../../core/shared/services/index';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  // styleUrls: ['./properties.component.css']
})
export class PropertyComponent implements OnInit {
  public properties: Array<PropertyModel> = [];
  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    let currentUser = this.localStorageService.getCurrentUser();
    this.getProperties(currentUser.userDetails.CustomerID);
  }


  getProperties(CustomerID) {
    this.propertyService.getProperties(CustomerID).then(result => {
      this.properties = result.data;
    })
  }

  public onClickProperty(project): void {
    this.router.navigate(['/property/' + project.PropertyID + '/virtualtour']);
  }

}
