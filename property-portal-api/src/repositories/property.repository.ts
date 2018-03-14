import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { Property } from '../models';
import { inject } from '@loopback/core';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.PropertyId
> {
  constructor(@inject('datasource') protected datasource: DataSourceType) {
    super(Property, datasource);
  }
}
