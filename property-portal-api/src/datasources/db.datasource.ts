// const DataSource = require('loopback-datasource-juggler').DataSource;
// export const ApiUrl = "http://go.nationaldecorators.co.nz:46002/";
// export const propertyFileBrowseUrl = "C:/Data/Admin Box Sync/Box Sync/Companies/";

// export const db = new DataSource({
//   connector: require('loopback-connector-mssql'),
//   host: 'localhost',
//   port: 1433,
//   database: 'FastDryNew',
//   password: 'admin@123#abc',
//   user: 'sa'
// });

const DataSource = require('loopback-datasource-juggler').DataSource;
export const ApiUrl = "http://localhost:46002/";
export const propertyFileBrowseUrl = "C:/data/FastDry.Net/Companys/";

export const db = new DataSource({
    connector: require('loopback-connector-mssql'),
    host: '192.168.1.110',
    port: 1433,
    database: 'FastDryNew',
    password: 'sa$123',
    user: 'sa',
    pool: {
      idleTimeoutMillis: 400000,
      max: 100
  }
});