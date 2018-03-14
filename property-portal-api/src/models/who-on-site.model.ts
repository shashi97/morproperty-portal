import { Entity, property, model } from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec';

@model()
export class WhoOnSite extends Entity {
  @property({
    type: 'number',
    id:true
  })
  ID?: number;

 
}

export const WhoOnSiteSchema: SchemaObject = {

};
