import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { Jobs } from '../models';
import { inject } from '@loopback/core';

export class JobsRepository extends DefaultCrudRepository<
  Jobs,
  typeof Jobs.prototype.JobId
> {
  constructor(@inject('datasource') protected datasource: DataSourceType) {
    super(Jobs, datasource);
  }

  
  // // We retrieve a Diary entry with the given id
  // getJobByCustomer(id: number): Jobs {
  //   return this.Jobs.find({ where: { CustomerID: id } });
  // }
}
