import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { Login } from '../models';
import { inject } from '@loopback/core';
// var bcrypt = require('bcrypt');

export class LoginRepository extends DefaultCrudRepository<
  Login,
  typeof Login.prototype.id
  > {
  constructor( @inject('datasource') protected datasource: DataSourceType) {
    super(Login, datasource);

  }
  // comparePassword(password, db_password) {
  //   return bcrypt.compare(password, db_password)
  // }
  // beforeCreate(userVal, next) {
  //   bcrypt.genSalt(10, (err, salt) {
  //     if (err) return next(err);
  //     bcrypt.hash(userVal.user_password, salt, (err, hash) {
  //       if (err) return next(err);
  //       userVal.user_password = hash;
  //       next(err, userVal);
  //     })
  //   })
  // }
}
