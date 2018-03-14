import { operation, get, RestBindings, param } from '@loopback/rest';
import { DataSourceType } from '@loopback/repository';
import { ServerResponse } from 'http';
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { PropertyRepository } from '../repositories/index';
import { db, ApiUrl, propertyFileBrowseUrl } from '../datasources/db.datasource';
import { Property, propertyImage , PropertyModel,ProjectModel } from '../models/index';
import * as path from 'path';
import * as fs from 'fs';


export class PropertyController {
  constructor( @repository('property') protected propertyRepo: PropertyRepository,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse,
    @inject('datasource') protected datasource: DataSourceType
  ) { }

  @get('/getPropertyById/{PropertyID}')
  @param.path.number('PropertyID')
  async findUserByJobId(PropertyID: number) {
    let sql = 'exec spGetPropertyByID\r ' + PropertyID;
    let p = new Promise<Property[]>((resolve, reject) => {
      db.connector.query(sql, function (err: string, results: Property[]) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    let result = await p;
    return result;
  }

  @get('/getAllProperties/{CustomerID}')
  @param.path.number('CustomerID')
  async getPropertyByCustID(CustomerID: number) {
    let sql = 'exec SP_GetPropertiesByCustomerID\r ' + CustomerID;
    let p = new Promise<Property[]>((resolve, reject) => {
      db.connector.query(sql, function (err: Error, results: Property[]) {
        if (err) {
          resolve(results);
        } else {
          resolve(results);
        }
      });
    });
    let result = await p;
    if (result.length > 0) {
      let propertyData = await this.getPropertiesImages(result);
      return propertyData;
    } else {
      return result = [];
    }
  }

  async getImage(filePath: string) {
    let p = new Promise<string[]>(function (resolve, reject) {
      fs.readdir(filePath, function (err: Error, data: string[]) {
        if (err)
          resolve(data);
        else
          resolve(data);
      });
    });
    return p;
  }

  getPropertyPath(element: Property) {
    return element.CustomerName + '/Properties/' + 'prop' + '_' + element.PropertyID;
  }

  async getPropertiesImages(property: Property[]) {
    let properties = property.map(async (element) => {
      let url: string = ApiUrl + this.getPropertyPath(element) + '/Thumbnail';
      let filePath: string = path.join(propertyFileBrowseUrl, this.getPropertyPath(element), '/Thumbnail/');
      let file = await this.getImage(filePath);
      if (!file || file.length === 0) {
        element.thumbUrl = null;
      } else {
        element.thumbUrl = url + '/' + file;
      }
      return element;
    });
    return Promise.all(properties);
  }

  async getPropertyImages(property: Property) {
    let propertyImages = new Array<propertyImage>();
    let url: string = ApiUrl + this.getPropertyPath(property) + '/Images';
    let filePath: string = path.join(propertyFileBrowseUrl, this.getPropertyPath(property), '/Images/');
    let fileList = await this.getImage(filePath);
    if (!fileList || fileList.length === 0) {
      return propertyImages = [];
    } else {
      fileList.forEach(list => {
        propertyImages.push({ url: url + '/' + list, name: list });
      });
    }
    return propertyImages;
  }

  @get('/propertyPosition/{CustomerID}')
  @param.path.number('CustomerID')
  async getPositionCustID(CustomerID: number) {
    let mapViewObj = { 'property': [{}], 'project': [{}] }
    let sqlProperty = 'SP_GetVirtualTourLongLatByCustomerID ' + CustomerID;
    let sqlqueryProject = 'SP_GetJobLongLantByCustomerID ' + CustomerID;
    let p = new Promise((resolve, reject) => {
      db.connector.query(sqlProperty, (err: string, results: PropertyModel[]) => {
        if (err) {
          resolve(results);
        } else {
          this.getMapViewPropertyImages(results).then(data => {
            mapViewObj.property = data;
          }).catch(error => {
            console.error(error);
          });
          db.connector.query(sqlqueryProject, (errs: string, results2: ProjectModel[]) => {
            if (errs) {
              resolve(results2);
            } else {
              if (results2.length > 0) {
                this.getMapViewProjectImages(results2).then(data => {
                  mapViewObj.project = data;
                  resolve(mapViewObj);
                }).catch(error => {
                  console.error(error);
                });
              } else {
                resolve(mapViewObj);
              }
            }
          });
        }
      });
    })
    let mapViewResult = await p;
    return mapViewResult;
  }
  getJobPath(element: Property) {
    return element.customerName + '/' + element.LeadName;
  }
  async getMapViewProjectImages(project: ProjectModel[]) {
    let projects = project.map(async (element) => {
      let url: string = ApiUrl + this.getJobPath(element) + '/Thumbnail';
      let filePath: string = path.join(propertyFileBrowseUrl, this.getJobPath(element), '/Thumbnail/');
      let file = await this.getImage(filePath);
      if (!file || file.length === 0) {
        element.thumbUrl = null;
      } else {
        element.thumbUrl = url + '/' + file;
      }
      return element;
    });
    return Promise.all(projects);
  }
  async getMapViewPropertyImages(property: PropertyModel[]) {
    let properties = property.map(async (element) => {
      let url: string = ApiUrl + this.getPropertyPath(element) + '/Thumbnail';
      let filePath: string = path.join(propertyFileBrowseUrl, this.getPropertyPath(element), '/Thumbnail/');
      let file = await this.getImage(filePath);
      if (!file || file.length === 0) {
        element.thumbUrl = null;
      } else {
        element.thumbUrl = url + '/' + file;
      }
      return element;
    });
    return Promise.all(properties);
  }

  @get('/propertyImage/{CustomerID}/{PropertyID}')
  @param.path.number('CustomerID')
  @param.path.number('PropertyID')
  async getPropertyImageByCustID(CustomerID: number, PropertyID: number) {
    let sql = 'exec SP_GetPropertiesImageByCustomerID\r ' + CustomerID + ',' + PropertyID;
    let p = new Promise<Property[]>((resolve, reject) => {
      db.connector.query(sql, function (err: string, results: Property[]) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    })
    let result = await p;
    if (result.length > 0) {
      let propertyData = await this.getPropertyImages(result[0]);
      return propertyData;
    } else {
      return result = [];
    }
  }

  async getPropertyProjects(property: Property[]) {
    let properties = property.map(async (element) => {
      let url: string = ApiUrl + this.getJobPath(element) + '/Thumbnail/';
      let filePath: string = path.join(propertyFileBrowseUrl, this.getJobPath(element), '/Thumbnail/');
      let fileList = await this.getImage(filePath);
      if (!fileList || fileList.length === 0) {
        element.thumbUrl = null;
      } else {
        fileList.forEach(list => {
          element.thumbUrl = url + list;
        });
      }
      return element;
    });
    return Promise.all(properties);
  }

  @get('/propertyProject/{PropertyID}')
  @param.path.number('PropertyID')
  async getPropertyProjectByCustID(PropertyID: number) {
    let sql = 'exec SP_GetPropertiesProjectByPropertyID\r ' + PropertyID;
    let p = new Promise<Property[]>((resolve, reject) => {
      db.connector.query(sql, function (err: string, results: Property[]) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    })
    let result = await p;
    if (result.length > 0) {
      let propertyData = await this.getPropertyProjects(result);
      return propertyData;
    } else {
      return result = [];
    }
  }

  @get('/VirtualTours/{CustomerID}/{PropertyID}')
  @param.path.number('CustomerID')
  @param.path.number('PropertyID')
  async GetVirtualToursByCustomerIDAndPropertyID(CustomerID: number, PropertyID: number) {
    let sql = 'exec SP_GetVirtualToursByCustomerIDAndPropertyID\r ' + CustomerID + ',' + PropertyID;
    let p = new Promise<Property[]>((resolve, reject) => {
      db.connector.query(sql, function (err: string, results: Property[]) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    let result = await p;
    if (result.length > 0) {
      let propertyData = await this.getPropertyTours(result);
      return propertyData;
    } else {
      return result = [];
    }
  }
  async getVirtualImage(filePath: string) {
    let p = new Promise<string[]>(function (resolve, reject) {
      fs.readdir(filePath, function (err: Error, data: string[]) {
        if (err)
          resolve(data);
        else
          resolve(data);
      });
    });
    return p;
  }
  async getPropertyTours(virtualTours: Property[]) {
    let tourResult = new Array<Property>();
    let properties = virtualTours.map(async (element) => {
      let url: string = ApiUrl + this.getPropertyPath(element) + '/VirtualTours/' + element.Title + '/app-files/tiles/';
      let filePath: string = path.join(propertyFileBrowseUrl, this.getPropertyPath(element), '/VirtualTours/' + element.Title + '/app-files/tiles/');
      let fileList = await this.getVirtualImage(filePath);
      if (!fileList || fileList.length === 0) {
        element.imageUrl = null;
        tourResult.push(element);
      } else {
        fileList.forEach(list => {
          element.imageUrl = url + list;
          tourResult.push(element);
        });
      }
      return tourResult;
    });
    return Promise.all(properties);
  }

  @operation('OPTIONS', '/propertyProject/{PropertyID}')
  propertyProject() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }
  @operation('OPTIONS', '/getAllProperties/{CustomerID}')
  optionsHeader() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }
  @operation('OPTIONS', '/getPropertyById/{PropertyID}')
  optionsPropertyById() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }

  @operation('OPTIONS', '/propertyImage/{CustomerID}/{PropertyID}')
  optionsPropertyproject() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }

  @operation('OPTIONS', '/VirtualTours/{CustomerID}/{PropertyID}')
  optionsVirtualTours() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }

  @operation('OPTIONS', '/propertyPosition/{CustomerID}')
  optionsPropertyPosition() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }
}
