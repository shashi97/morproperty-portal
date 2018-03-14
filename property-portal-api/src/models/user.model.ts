import { Entity, property, model } from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id:true
  })
  ID?: number;

  @property({
    type: 'string'
  })
  name: string;

  @property({
    type: 'string'
  })
  password: string;

  @property({
    type: 'string'
  })
  address: string;

  @property({
    type: 'string'
  })
  number: number;

  getId() {
    return this.ID;
  }
}

export const UserSchema: SchemaObject = {
  title: 'User',
  properties: {
    ID: {
      type: 'number',
      description: 'ID number of the Todo entry.'
    },
    name: {
      type: 'string',
      description: 'Title of the Todo entry.'
    },
    password: {
      type: 'string',
      description: 'Title of the Todo entry.'
    },
    address: {
      type: 'string',
      description: 'Title of the Todo entry.'
    },
    number: {
      type: 'string',
      description: 'Title of the Todo entry.'
    }
  }
};
