import { Entity, property, model } from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec';

@model()
export class Jobs extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  JobId?: number;
  @property({
    type: 'number',
  })
  CustomerID?: number;

  @property({
    type: 'number'
  })
  JobNo: number;

  @property({
    type: 'string'
  })
  LeadName: string;

  pdfUrl: Array<SafetySchema> = [];

  getId() {
    return this.JobId;
  }
}

export class SafetySchema {
  
    url:string = '';
    name:string =  '';
 
}

export const JobsSchema: SchemaObject = {
  title: 'Jobs',
  properties: {
    JobId: {
      type: 'number',
      description: 'ID number of the Todo entry.'
    },
    JobNo: {
      type: 'string',
      description: 'Title of the Todo entry.'
    },
    LeadName: {
      type: 'string',
      description: 'Title of the Todo entry.'
    },


  }
};