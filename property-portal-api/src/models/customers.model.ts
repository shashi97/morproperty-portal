import { Entity, property, model } from '@loopback/repository';
import { SchemaObject } from '@loopback/openapi-spec';

@model()
export class Customer extends Entity {

    @property({
        type: 'number',
        id: true
    })
    CustomerID?: number;

    @property({
        type: 'string'
    })
    CustomerName: string;

}

export const CustomerSchema: SchemaObject = {
    title: 'Customer',
    properties: {
        CustomerID: {
            type: 'string',
            description: 'Email of User.'
        },
        CustomerName: {
            type: 'string',
            description: 'Password of User.'
        }
    }
};