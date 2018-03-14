import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { QaForms  } from '../models';
import { inject } from '@loopback/core';

export class QaFormsRepository extends DefaultCrudRepository<
QaForms,
  typeof QaForms.prototype.ContactID
  > {
  constructor( @inject('datasource') protected datasource: DataSourceType) {
    super(QaForms, datasource);
  }
}
