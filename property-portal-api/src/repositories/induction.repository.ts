import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { Induction } from '../models';
import { inject } from '@loopback/core';

export class InductionRepository extends DefaultCrudRepository<
  Induction,
  typeof Induction.prototype.JobId
> {
  constructor(@inject('datasource') protected datasource: DataSourceType) {
    super(Induction, datasource);
  }
}
