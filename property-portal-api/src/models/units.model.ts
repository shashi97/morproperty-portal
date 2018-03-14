import { Entity, property, model } from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec';

@model()
export class Units extends Entity {
  @property({
    type: 'number',
    id:true,
    UnitID: true
  })
  UnitID?: number;

  @property({
    type: 'string'
  })
  UnitName: string;

  @property({
    type: 'boolean'
  })
  UsedForKit: boolean;

  @property({
    type: 'boolean'
  })
  UsedForProduct: boolean;

 
  getId() {
    return this.UnitID;
  }
}

export const UnitsSchema: SchemaObject = {
  title: 'Units',
  properties: {
    UnitID: {
      type: 'number',
      description: 'ID number of the Todo entry.'
    },
    UnitName: {
      type: 'string',
      description: 'Title of the Todo entry.'
    },
    UsedForKit: {
      type: 'boolean',
      description: 'Title of the Todo entry.'
    },
    UsedForProduct: {
      type: 'boolean',
      description: 'Title of the Todo entry.'
    }
  }
};
