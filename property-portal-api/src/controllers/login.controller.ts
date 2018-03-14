import { } from '@loopback/rest';
import { } from '../models';
import { repository } from '@loopback/repository';
import { LoginRepository } from '../repositories/index';
export class LoginController {

  constructor( @repository('login') protected loginRepo: LoginRepository) {
  }
}