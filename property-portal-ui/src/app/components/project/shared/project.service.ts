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
import {ProjectModel} from './project.model'



@Injectable()
export class ProjectService {
  constructor(private http: Http) { }
  
  getJob(customerId): Promise<any> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Jobs/' + customerId)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }
  

  public getSafetyList(customerId, jobId): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'getSafetyPdf/' + Number(customerId) +'/' + Number(jobId ))
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  public getInductionRegisterList(projectId): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'induction/'+projectId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  
  public getProjectOnsiteList(projectId): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'getwhoonsite/'+projectId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

  public getProjectDetail(projectId): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'getJobByJobId/'+projectId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  public getQaForms(jobId , UserId  ): Promise<ArrayResponseModel<any>> {
    // let companyName:string = "Test";
    // let jobName:string = "Non Chargeable Location";
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'getQaForms/'+ jobId + '/' + UserId  )
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

  // public getQaForms(jobId , UserId): Promise<ArrayResponseModel<any>> {
  //   let companyName:string = "Test";
  //   let jobName:string = "Non Chargeable Location";
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'getQaForms/199/1/' + jobName + '/' + companyName)
  //     .toPromise();
  //   return new PromiseHandler<ArrayResponseModel<any>>(promise);
  // }
}
