import { post, param, operation, get, RestBindings } from '@loopback/rest';
import { ServerResponse } from 'http';
import { inject } from '@loopback/core';
import { Contacts, Login, LoginSchema } from '../models';
import { repository } from '@loopback/repository';
import { ContactsRepository } from '../repositories/index';
let jwt = require('jsonwebtoken');
export class ContactsController {
  constructor( @repository('contacts') protected contactsRepo: ContactsRepository,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse
  ) { }

  @get('/contacts')
  async findContacts(): Promise<Contacts[]> {
    return await this.contactsRepo.find();
  }

  @get('/contacts/{id}')
  @param.path.number('id')
  @param.query.boolean('items')
  async findContactsById(id: number, items?: boolean): Promise<Contacts> {
    return await this.contactsRepo.findById(id);
  }


  @post('/login')
  // @param.path.string('Email')
  // @param.path.string('Password')
  @param.body('login', LoginSchema)
  async login(login: Login) {
    // const result = await this.loginRepo.create(login);
    // return result;

    let result = await this.contactsRepo.find({ where: { Email: login.Email } });
    if (!result) {
      throw new Error('Invalid UserName and Password!');
    }
    let userInfo = result[0];
    let valid = (userInfo.Password === login.Password) ? true : false;
    if (!valid) {
      throw new Error('Invalid UserName and Password!');
    } else {
      let user = {
        userDetails: {},
        token: {},
        userName: ''
      };
      let token = await jwt.sign({ username: result }, 'richard', { expiresIn: 120 });
      if (userInfo.Password) {
        delete userInfo.Password;
      }
      userInfo.authentication = true;
      user.userDetails = userInfo;
      user.userName = userInfo.FirstName + ' ' + userInfo.LastName;
      user.token = token;
      return user;
    }
  }
  @operation('OPTIONS', '/login')
  optionsHeader() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }
}
