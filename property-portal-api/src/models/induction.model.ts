import { Entity, property, model } from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec';

@model()
export class Induction extends Entity {

  @property({
    type: 'number',
    id:true,
    SSPInductionID:true
  })
  SSPInductionID?: number;

  @property({
    type: 'number'
  })
  EmployeeID: number;

  @property({
    type: 'string'
  })
  InductedDateTime: string;

  @property({
    type: 'boolean'
  })
  IsActive: boolean;

  @property({
    type: 'number'
  })
  JobId: string;

  
}

export const InductionSchema: SchemaObject = {
  title: 'Induction',
  properties: {
    
    SSPInductionID: {
      type: 'number',
      description: 'ID number of the Todo entry.'
    },

    EmployeeID: {
         type: 'number',
      description: 'ID number of the Todo entry.'
    },

    InductedDateTime: {
      type: 'string',
      description: 'Title of the Todo entry.'
    },
        IsActive: {
      type: 'boolean',
      description: 'Title of the Todo entry.'
    }
  }
};
