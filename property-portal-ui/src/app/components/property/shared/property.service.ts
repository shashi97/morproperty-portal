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
import {PropertyModel} from './property.model'



@Injectable()
export class PropertyService {
  constructor(private http: Http) { }
  
  getProperties(customerId): Promise<ArrayResponseModel<PropertyModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'getAllProperties/' + customerId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  

  getPropertyProject(propertyId): Promise<any> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'propertyProject/' + propertyId)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }


  getPropertyImages(customerId, propertyId): Promise<any> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'propertyImage/' + customerId +'/'+ propertyId)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }


  public getPropertyDetail(propertyId): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'getPropertyById/'+propertyId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }


  getLocations(customerId, propertyId): Promise<any> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'VirtualTours/' + customerId +'/'+ propertyId)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }
 



 
  //  getLocations(customerId , propertyId): Promise<VirtualTourModel>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'VirtualTours/' + customerId + '/' + propertyId)
  //     .toPromise();
  //   return new PromiseHandler<ArrayResponseModel<any>>(promise);
  // }

  
  // public getProperties(jobId,customerId): Promise<ArrayResponseModel<any>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'getSafetyPdf/' + Number(customerId) +'/' + Number(jobId ))
  //     .toPromise();
  //   return new PromiseHandler<ArrayResponseModel<any>>(promise);
  // }
  // public getInductionRegisterList(projectId): Promise<ArrayResponseModel<any>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'induction/'+projectId)
  //     .toPromise();
  //   return new PromiseHandler<ArrayResponseModel<any>>(promise);
  // }
  
  // public getProjectOnsiteList(projectId): Promise<ArrayResponseModel<any>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'getwhoonsite/'+projectId)
  //     .toPromise();
  //   return new PromiseHandler<ArrayResponseModel<any>>(promise);
  // }
}
