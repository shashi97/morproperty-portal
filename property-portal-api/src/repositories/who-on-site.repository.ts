import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { WhoOnSite } from '../models';
import { inject } from '@loopback/core';

export class whoOnSiteRepository extends DefaultCrudRepository<
  WhoOnSite,
  typeof WhoOnSite.prototype.id
> {
  constructor(@inject('datasource') protected datasource: DataSourceType) {
    super(WhoOnSite, datasource);
  }
}