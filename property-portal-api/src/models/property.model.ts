import { Entity, property, model } from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec';

@model()
export class Property extends Entity {
  @property({
    type: 'number',
    id: true,
    PropertyID: true
  })
  PropertyID?: number;

  @property({
    type: 'number'
  })
  Name: string;

  @property({
    type: 'string'
  })
  Description: string;

}

export class mapViewSchema {

  project = [];
  props = [];

}

export class propertyImage {
  url: string = '';
  name: string = '';
}
export class PropertyModel extends Property {
  Longitude: '';
  Latitude: '';
  JobId: number = 0;
  JobNo: number = 0;
  LeadName: string = '';
  CustomerID: number = 0;
  customerName: string = '';
  Name: string = ''

}

export class ProjectModel extends Property {
  Longitude: number = 0;
  Latitude: number = 0;
  PropertyID: number = 0;
  Name: string = '';
  Description: string = '';
  CustomerID: number = 0;
  CustomerName: string = '';

}

export const PropertySchema: SchemaObject = {
  title: 'Property',
  properties: {
    PropertyID: {
      type: 'number',
      description: 'ID number of the Todo entry.'
    },

    Name: {
      type: 'string',
      description: 'ID number of the Todo entry.'
    },

    Description: {
      type: 'string',
      description: 'Title of the Todo entry.'
    }
  }
};
