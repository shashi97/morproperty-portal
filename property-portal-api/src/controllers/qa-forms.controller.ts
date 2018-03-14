import { param, get, RestBindings, operation } from '@loopback/rest';
import { DataSourceType } from '@loopback/repository';
import { ServerResponse } from 'http';
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { QaFormsRepository } from '../repositories/index';
import { db, ApiUrl, propertyFileBrowseUrl } from '../datasources/db.datasource';
import { QaFormsModel, CustomerDetail,JobDetail } from '../models/index';
import * as path from 'path';
import * as fs from 'fs';

export class qaFormsController {
  jobName:string = '';
  customerName : string = "";
  QAFormsData: Array<QaFormsModel> = new Array<QaFormsModel>();
  constructor( @repository('QaForms') protected qaFormsRepo: QaFormsRepository,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse,
    @inject('datasource') protected datasource: DataSourceType
  ) { }

  @get('/getQaForms/{jobId}/{userId}')
  @param.path.number('jobId')
  @param.path.number('userId')
  async findQaForms(jobId: number, userId: number) {
    let jobDetail  = await this.findJobName(jobId);
    this.jobName = jobDetail[0].LeadName;
    let customerDetail = await this.findCustomerName(userId);
    this.customerName = customerDetail[0].CustomerName;
    let jobFormName = await this.getFormsName();
    return jobFormName[0];
    // let propertyData = await this.getPropertyImages(jobFormName);
    // return propertyData[0];
    
  }

  async findCustomerName(userId:number) {
    let sql = "select (CustomerName) from Customers where CustomerID = " + userId;
    let p = new Promise<CustomerDetail[]>((resolve, reject) => {
      db.connector.query(sql, function (err: string, results: CustomerDetail[]) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    let result=await p;
    return result;
  }

  async findJobName(jobId:number) {
    let sql = "select (LeadName) from jobs where JobID = " + jobId;
    let p = new Promise<JobDetail[]>((resolve, reject) => {
      db.connector.query(sql, function (err: string, results: JobDetail[]) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    let result=await p;
    return result;
  }

  async getPropertyImages(qaFormsModel: Array<string>) {
  //   let qaForms = qaFormsModel.map(async (element) => {
  //   element.Attachments = [];
  //   let url: string = ApiUrl + this.getQAFormsPdfPath(element);
  //   let filePath: string = path.join(propertyFileBrowseUrl, this.getQAFormsPdfPath(element));
  //   let fileList = await this.getImage(filePath);
  //   if (fileList) {
  //      fileList.forEach(list => {
  //       element.Attachments.push({ url: url + '/' + list, name: list });
  //     });
  //   }
  //   return qaFormsModel;
  // });
  // return Promise.all(qaForms);
  }

  async getFormsName() {
    let companyFilePath = this.customerName + '/' + this.jobName + '/JobFormPdf/';
    let pdfPath  = path.join(propertyFileBrowseUrl, companyFilePath);
    let forms = await this.getImage(pdfPath);
    let qaForms = forms.map(async (element) => {
     
        let url: string = ApiUrl + this.getQAFormsPdfPath(element);
        let filePath: string = path.join(propertyFileBrowseUrl, this.getQAFormsPdfPath(element));
        let fileList = await this.getImage(filePath);
        if (fileList) {
           let object = new QaFormsModel();
           object.JobFormName = element;
           fileList.forEach(list => {
            object.Attachments.push({ url: url + '/' + list, name: list });
          });
          this.QAFormsData.push(object);
        }
       
      return this.QAFormsData;
     
    });
    return Promise.all(qaForms);
  }

  async getImage(filePath: string) {
    let p = new Promise<string[]>(function (resolve, reject) {
      fs.readdir(filePath, function (err: Error, data: string[]) {
        if (err)
          resolve(data);
        else
          resolve(data);
      });
    });
    return p;
  }

  getQAFormsPdfPath(element:string) {  
    return this.customerName + '/' + this.jobName + '/JobFormPdf/' + element;
  }

  // getQAFormsImagePath(element: QaFormsModel) {  
  //   return this.customerName + '/' + this.jobName + '/JobFormImage/' + element.JobFormName;
  // }

  @operation('OPTIONS', '/getQaForms/{jobId}/{userId}')
  optionsHeader() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }
}
