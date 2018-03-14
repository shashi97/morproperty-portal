import { get, param, operation, RestBindings } from '@loopback/rest';
import { Jobs, SafetySchema } from '../models';
import { inject } from '@loopback/core';
import { ServerResponse } from 'http';
import { repository, DataSourceType } from '@loopback/repository';
import { SafetyRepository } from '../repositories/index';
import { db, ApiUrl, propertyFileBrowseUrl } from '../datasources/db.datasource';
import * as path from 'path';
import * as fs from 'fs';

export class SafetyController {
  testFolder: string = 'C:/data/FastDry.Net/Companys/'
  constructor( @repository('Jobs') protected SafetyRepo: SafetyRepository,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse,
    @inject('datasource') protected datasource: DataSourceType
  ) { }

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

  @get('/getSafetyPdf/{CustomerID}/{JobID}')
  @param.path.number('CustomerID')
  @param.path.number('JobID')
  async getSafetyPdf(CustomerID: number, JobID: number) {
    let sqlQeury = 'exec SP_GetPdfByCustomerIDAndJobID\r ' + CustomerID + ',' + JobID;
    let p = new Promise<Jobs[]>((resolve, reject) => {
      db.connector.query(sqlQeury, function (err: string, results: Jobs[]) {
        if (err) {
          resolve([]);
        } else {
          resolve(results)
        }
      });
    });
    let result = await p;
    if (result.length > 0) {
      let safetyArr = new Array<SafetySchema>();
      let jobData = result[0];
      let url = ApiUrl + jobData.customerName + '/' + jobData.LeadName + '/Site specific safety plan/';
      let jsonPath: string = path.join(propertyFileBrowseUrl, jobData.customerName, jobData.LeadName, '/Site specific safety plan/');
      let fileList = await this.getImage(jsonPath);
      if (!fileList || fileList.length === 0) {
        safetyArr = [];
      } else {
        fileList.forEach(list => {
          safetyArr.push({ url: url + list, name: list });
        });
      }
      return safetyArr;
    } else {
      return result = [];
    }
  }

  @operation('OPTIONS', '/getSafetyPdf/{CustomerID}/{JobID}')
  optionsHeader() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }
}

  //   @get('/Job/{CustomerID}')
  //   @param.path.number('CustomerID')
  //   async findJobByCustomerID(CustomerID: number): Promise<Jobs[]> {
  //     return await this.JobsRepo.find({ where: { CustomerID: CustomerID } });
  //   }
