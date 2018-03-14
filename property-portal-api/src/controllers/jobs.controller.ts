import { get, param, operation, RestBindings } from '@loopback/rest';
import { Jobs } from '../models';
import { repository } from '@loopback/repository';
import { JobsRepository } from '../repositories/index';
import { ServerResponse } from 'http';
import { inject } from '@loopback/core';
import { db, ApiUrl, propertyFileBrowseUrl } from '../datasources/db.datasource';
import * as path from 'path';
import * as fs from 'fs';
export class JobsController {
  jobs: Array<Jobs> = [];
  constructor( @repository('Jobs') protected JobsRepo: JobsRepository,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse
  ) { }

  @get('/Jobs')
  async findJobs() {
    return await this.JobsRepo.find();
  }

  @get('/getJobByJobId/{JobID}')
  @param.path.number('JobID')
  async findUserByJobId(JobID: number) {
    let sql = 'exec spGetJobsByID\r ' + JobID;
    let p = new Promise<Jobs[]>((resolve, reject) => {
      db.connector.query(sql, function (err: string, results: Jobs[]) {
        if (err) {
          resolve();
        } else {
          resolve(results);
        }
      });
    });
    let result = await p;
    return result;
  }

  @get('/Jobs/{CustomerID}')
  @param.path.number('CustomerID')
  async findJobByCustomerID(CustomerID: number) {
    let sqlQeury = 'exec SP_GetJobsByCustomerID\r ' + CustomerID;
    let p = new Promise<Jobs[]>((resolve, reject) => {
      db.connector.query(sqlQeury, function (err: string, results: Jobs[]) {
        if (err) {
          resolve([]);
        } else {
          resolve(results);
        }
      });
    })
    let result = await p;
    if (result.length > 0) {
      let jobResult = await this.getJobProjects(result);
      return jobResult;
    } else {
      return result = [];
    }
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
  getJobPath(element: Jobs) {
    return element.customerName + '/' + element.LeadName;
  }
  async getJobProjects(jobData: Jobs[]) {
    let properties = jobData.map(async (element) => {
      let url: string = ApiUrl + this.getJobPath(element) + '/Thumbnail';
      let filePath: string = path.join(propertyFileBrowseUrl, this.getJobPath(element), '/Thumbnail/');
      let fileList = await this.getImage(filePath);
      if (!fileList || fileList.length === 0) {
        element.thumbUrl = null;
      } else {
        fileList.forEach(list => {
          element.thumbUrl = url + '/' + list;
        });
      }
      return element;
    });
    return Promise.all(properties);
  }

  @operation('OPTIONS', '/Jobs/{CustomerID}')
  optionsHeader() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );

  }
  @operation('OPTIONS', '/getJobByJobId/{JobID}')
  optionsGetHeader() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }

}
