import { param, get, RestBindings, operation } from '@loopback/rest';
import { DataSourceType } from '@loopback/repository';
import { WhoOnSite } from '../models';
import { ServerResponse } from 'http';
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { whoOnSiteRepository } from '../repositories/index';
import { db } from '../datasources/db.datasource';

export class whoOnSiteController {
  constructor( @repository('whoOnSite') protected whoOnSiteRepo: whoOnSiteRepository,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse,
    @inject('datasource') protected datasource: DataSourceType
  ) { }

  @get('/getwhoonsite/{id}')
  @param.path.number('id')
  async findWhoOnSite(id: number) {
    let sql = 'exec spGetWhoOnSitetDetailByID\r ' + id;
    let p = new Promise<WhoOnSite[]>((resolve, reject) => {
      db.connector.query(sql, function (err: string, results: WhoOnSite[]) {
        if (err) {
          reject(err);
        } else {
         
          resolve(results);
        }
      });
    });
    let result = await p;
    return result;
  }

  @operation('OPTIONS', '/getwhoonsite/{id}')
  optionsHeader() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }
}
