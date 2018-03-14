import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { Jobs } from '../models';
import { inject } from '@loopback/core';
// import { db } from '../datasources/db.datasource';

export class SafetyRepository extends DefaultCrudRepository<
  Jobs,
  typeof Jobs.prototype.id
  > {
  constructor( @inject('datasource') protected datasource: DataSourceType) {
    super(Jobs, datasource);
  }
  // getPdf(CustomerID: number, JobID: number) {
  //   let sqlQeury = '\r\nexec SP_GetPdfByCustomerIDAndJobID\r' + CustomerID + '/' + JobID;
  //   db.connector.query(sqlQeury, function (err: string, results: Jobs) {
  //     if (err) {
  //       throw err;
  //     } else {
  //       results.pdfUrl = 'C:/data/company/' + results.customerName + '/' + results.LeadName + '/safety/';
  //       return results;
  //     }
  //   });
  // }
}
