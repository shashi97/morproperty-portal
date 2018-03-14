import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { Customer } from '../models';
import { inject } from '@loopback/core';
// var bcrypt = require('bcrypt');

export class CustomerRepository extends DefaultCrudRepository<
Customer,
  typeof Customer.prototype.id
  > {
  constructor( @inject('datasource') protected datasource: DataSourceType) {
    super(Customer, datasource);
  }
}
