import { operation, get, RestBindings,param } from '@loopback/rest';
import { DataSourceType } from '@loopback/repository';
import { ServerResponse } from 'http';
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { InductionRepository } from '../repositories/index';
import { db } from '../datasources/db.datasource';
import { Induction } from '../models/index';

export class InductionController {
  constructor( @repository('induction') protected inductionRepo: InductionRepository,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse,
    @inject('datasource') protected datasource: DataSourceType
  ) { }
  
  
  @get('/induction/{JobID}')
  @param.path.number('JobID')
  async getInduction(JobID: number) {
    let sql = 'exec SP_GetInductionByJobID\r ' + JobID;
    let p = new Promise<Induction[]>((resolve, reject) => {
      db.connector.query(sql, function (err: string, results: Induction[]) {
        if (err) {
          resolve();
        } else {
          resolve(results);
        }
      });
    });
    let result=await p;
    return result;

  }

 @operation('OPTIONS', '/induction/{JobID}')
  optionsHeader() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }
}
