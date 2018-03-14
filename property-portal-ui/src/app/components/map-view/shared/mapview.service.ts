import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
// import { ResetPasswordModel } from '../../reset-password/reset-password.model';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  DeletePromiseHandler,
  ArrayResponseModel
} from './../../../components/shared/models/base-data.model';
import { ApiUrl } from '../../../shared/api.service';
// import {PropertyModel} from './property.model'



@Injectable()
export class MapViewService {
  constructor(private http: Http) { }
  
  getMapViewLocations(CustomerID): Promise<any> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'propertyPosition/' + CustomerID)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  
}
