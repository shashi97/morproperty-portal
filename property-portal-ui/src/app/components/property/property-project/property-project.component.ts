import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyProjectModel } from '../shared/property.model'
import { PropertyService } from '../shared/property.service'
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'app-propertyProject',
  templateUrl: './property-project.component.html',
  // styleUrls: ['./property-project.component.css']
})
export class PropertyProjectComponent implements OnInit {

  public propertyProject: Array<PropertyProjectModel> = new Array<PropertyProjectModel>();

  public image: any = new Image();
  private propertyId: number;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private propertyService: PropertyService,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit() {
    let currentUser = this.localStorageService.getCurrentUser();
    this.propertyId = this.route.snapshot.params['propertyId'] || 0;
    this.getPropertyProject(currentUser.userDetails.CustomerID);
  }

  getPropertyProject(CustomerID) {
    this.propertyService.getPropertyProject(this.propertyId).then(result => {
      this.propertyProject = result.data;
    })
  }

  onClickProject(props){
    this.router.navigate(['/project/' + props.JobId + '/safety']);
  }

}
