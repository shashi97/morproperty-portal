import { Entity, property, model } from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec';

@model()
export class Contacts extends Entity {
  @property({
    type: 'number'
  })
  CustomerID?: number;

  @property({
    id: true,
    type: 'number',
    ContactID: true
  })
  ContactID?: number;

  @property({
    type: 'string'
  })
  FirstName: string;

  @property({
    type: 'string'
  })
  LastName: string;

  @property({
    type: 'number'
  })
  Ph1: string;

  @property({
    type: 'number'
  })
  PH2: string;

  @property({
    type: 'string'
  })
  Mobile: string;

  @property({
    type: 'string'
  })
  Email: string;

  @property({
    type: 'string'
  })
  Fax: string;

  @property({
    type: 'string'
  })
  Position: string;

  @property({
    type: 'boolean'
  })
  IsPrimaryContact: boolean;

  @property({
    type: 'string'
  })
  Comments: string;

  @property({
    type: 'boolean'
  })
  IsActive: boolean;

  @property({
    type: 'string'
  })
  Password: string;

  @property({
    type: 'boolean'
  })
  IsDoNotMarket: boolean;

  @property({
    type: 'date'
  })
  CreateDate: Date;

  @property({
    type: 'date'
  })
  EditDate: Date;

  @property({
    type: 'boolean'
  })
  IsSecondaryContact: boolean;

  getContactId() {
    return this.ContactID;
  }
}

export const ContactsSchema: SchemaObject = {
  title: 'Contacts',
  properties: {
    CustomerID: {
      type: 'number'
    },
    ContactID: {
      type: 'number'
    },
    FirstName: {
      type: 'string'
    },
    LastName: {
      type: 'string'
    },
    Ph1: {
      type: 'string'
    },
    PH2: {
      type: 'string'
    },
    Mobile: {
      type: 'string'
    },
    Email: {
      type: 'string'
    },
    Fax: {
      type: 'string'
    },
    Position: {
      type: 'string'
    },
    IsPrimaryContact: {
      type: 'boolean'
    },
    Comments: {
      type: 'string'
    },
    IsActive: {
      type: 'boolean'
    },
    Password: {
      type: 'string'
    },
    IsDoNotMarket: {
      type: 'boolean'
    },
    CreateDate: {
      type: 'date'
    },
    EditDate: {
      type: 'date'
    },
    IsSecondaryContact: {
      type: 'boolean'
    }
  }
};
