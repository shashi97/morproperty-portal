import { } from '@loopback/rest';
import { } from '../models';
import { repository } from '@loopback/repository';
import { CustomerRepository } from '../repositories/index';
export class CustomerController {

  constructor( @repository('customer') protected customerRepo: CustomerRepository) {
  }
}