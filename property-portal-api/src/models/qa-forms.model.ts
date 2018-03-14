import { Entity, property, model } from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec';

@model()
export class QaForms extends Entity {
  @property({
    type: 'number',
    id:true
  })
  ID?: number;

 
}

export class QaFormsModel {
  JobFormID: '';
  JobFormTypeID: '';
  JobID: number = 0;
  IntervalID: number = 0;
  JobFormName: string = '';
  Attachments: Array<Attachment> = [];
  Status: string = '';
  IntervalName: string = '';
  CreatedBy: string = '';
  SubmitDate: string = '';
}
export class Attachment {
  url:string;
  name:string;
}
export class CustomerDetail {
  CustomerName:string = '';
}

export class JobDetail {
  LeadName:string = '';
}
export const QaFormsSchema: SchemaObject = {

};