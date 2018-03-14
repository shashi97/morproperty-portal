import { Application, ApplicationConfig } from '@loopback/core';
import { RestComponent, RestServer } from '@loopback/rest';

import {
  ContactsController,
  UserController,
  JobsController,
  LoginController,
  UnitsController,
  CustomerController,
  SafetyController,
  InductionController,
  PropertyController,
  whoOnSiteController,
  qaFormsController
} from './controllers';
import {
  ContactsRepository,
  UnitsRepository,
  UserRepository,
  JobsRepository,
  LoginRepository,
  CustomerRepository,
  SafetyRepository,
  InductionRepository,
  PropertyRepository,
  whoOnSiteRepository,
  QaFormsRepository
} from './repositories';


import { db ,propertyFileBrowseUrl} from './datasources/db.datasource';
import { DataSourceConstructor } from '@loopback/repository';

let directory = propertyFileBrowseUrl;
let express = require('express');
let cors = require('cors');
let server = express();
import * as path from 'path';

export class ContactsApplication extends Application {
  constructor(options?: ApplicationConfig) {
    // Allow options to replace the defined components array, if desired.
    options = Object.assign(
      {},
      {
        components: [RestComponent]
      },
      options
    );
    super(options);
    this.setupRepositories();
    this.setupControllers();
    server.use(cors());
    let dir = path.join(directory)
    server.use(express.static(dir));
    let a = path.join(__dirname,"assets/")
    server.use(express.static(a));   
    server.listen(46002);
  }

  // Helper functions (just to keep things organized)
  setupRepositories() {
    let datasource =
      this.options && this.options.datasource
        ? new DataSourceConstructor(this.options.datasource)
        : db;

    this.bind('datasource').to(datasource);
    this.bind('repositories.units').toClass(UnitsRepository);
    this.bind('repositories.user').toClass(UserRepository);
    this.bind('repositories.Jobs').toClass(JobsRepository);
    this.bind('repositories.contacts').toClass(ContactsRepository);
    this.bind('repositories.login').toClass(LoginRepository);
    this.bind('repositories.customer').toClass(CustomerRepository);
    this.bind('repositories.safety').toClass(SafetyRepository);
    this.bind('repositories.induction').toClass(InductionRepository);
    this.bind('repositories.property').toClass(PropertyRepository);
    this.bind('repositories.whoOnSite').toClass(whoOnSiteRepository);
    this.bind('repositories.QaForms').toClass(QaFormsRepository);
  }

  setupControllers() {
    this.controller(UnitsController, );
    this.controller(UserController);
    this.controller(ContactsController);
    this.controller(JobsController);
    this.controller(LoginController);
    this.controller(CustomerController);
    this.controller(SafetyController);
    this.controller(InductionController);
    this.controller(PropertyController);    
    this.controller(whoOnSiteController);
    this.controller(qaFormsController);
  }

  async start() {
    // get a singleton HTTP server instance
    const rest = await this.getServer(RestServer)
    rest.bind('rest.port').to(46001);
    rest.bind('rest.host').to("localhost");
   // rest.bind('rest.host').to("go.nationaldecorators.co.nz"); //for production 
    await super.start();
  }
}
