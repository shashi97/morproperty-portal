import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
// import { ResetPasswordModel } from '../../reset-password/reset-password.model';
import {VirtualTourModel} from './virtualTour.model'

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



@Injectable()
export class VirtualTourService {
  constructor(private http: Http) { }
  
  getPropertyImages(customerId, propertyId): Promise<any> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'VirtualTours/' + 2455 +'/'+ propertyId)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  // getLocations(customerId , propertyId): Promise<ArrayResponseModel<VirtualTourModel>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'VirtualTours/' + customerId + '/' + propertyId)
  //     .toPromise();
  //   return new PromiseHandler<ArrayResponseModel<any>>(promise);
  // }
  
  getLocation(customerId , propertyId){
    return this.http.get(ApiUrl.MAIN_URI + 'VirtualTours/' + customerId + '/' + propertyId)
    .map((res:Response) => res.json());
  }

  
}
