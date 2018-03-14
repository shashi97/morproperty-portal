import { Entity, property, model } from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec';

@model()
export class Login extends Entity {
  
  @property({
    type: 'string'
  })
  Email: string;

  @property({
    type: 'string'
  })
  Password: string;

}

export const LoginSchema: SchemaObject = {
  title: 'Login',
  properties: {
    Email: {
      type: 'string',
      description: 'Email of User.'
    },
    Password: {
      type: 'string',
      description: 'Password of User.'
    }
  }
};