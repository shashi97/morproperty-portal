import { post, param, operation, get, put, patch, del, RestBindings } from '@loopback/rest';
import { DataSourceType } from '@loopback/repository';
import { UserSchema, User } from '../models';
import { ServerResponse } from 'http';
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories/index';
import { db } from '../datasources/db.datasource';

export class UserController {
  constructor( @repository('user') protected userRepo: UserRepository,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse,
    @inject('datasource') protected datasource: DataSourceType
  ) { }
  
  @post('/user')
  @param.body('user', UserSchema)
  async createUser(user: User): Promise<User> {
    return await this.userRepo.create(user);
  }

  @get('/user/{id}')
  @param.path.number('id')
  @param.query.boolean('items')
  async findUserById(id: number, items?: boolean): Promise<User> {
    return await this.userRepo.findById(id);
  }
  
  @get('/user')
  async findUser() {
    let sql = 'select * from [User]';
    let p = new Promise<User[]>((resolve, reject) => {
      db.connector.query(sql, function (err: string, results: User[]) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    let result=await p;
    return result;
  }

  @put('/user/{id}')
  @param.path.number('id')
  @param.body('user', UserSchema)
  async replaceUser(id: number, user: User): Promise<boolean> {
    return await this.userRepo.replaceById(id, user);
  }

  @patch('/user/{id}')
  @param.path.number('id')
  @param.body('user', UserSchema)
  async updateUser(id: number, user: User): Promise<boolean> {
    return await this.userRepo.updateById(id, user);
  }

  @del('/user/{id}')
  @param.path.number('id')
  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepo.deleteById(id);
  }

  @operation('OPTIONS', '/')
  optionsHeader() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }
}
