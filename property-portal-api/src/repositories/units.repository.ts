import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { Units } from '../models';
import { inject } from '@loopback/core';

export class UnitsRepository extends DefaultCrudRepository<
  Units,
  typeof Units.prototype.UnitID
> {
  constructor(@inject('datasource') protected datasource: DataSourceType) {
    super(Units, datasource);
  }
}
