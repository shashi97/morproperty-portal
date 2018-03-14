import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { Contacts,  } from '../models';
import { inject } from '@loopback/core';

export class ContactsRepository extends DefaultCrudRepository<
  Contacts,
  typeof Contacts.prototype.ContactID
  > {
  constructor( @inject('datasource') protected datasource: DataSourceType) {
    super(Contacts, datasource);
  }
}
