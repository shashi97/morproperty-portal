export class ProjectModel {
  JobId: number;
  JobNo: number;
  LeadName: string;
  CustomerId: number;
  thumbUrl: string;
  PaidDate: any;
  StatusID:number;
}

export class ProjectSafetyInductionModel {
  EmployeeName: string;
  InductedDateTime: any;
  EmployeeImage: any;


}

export class SafetySchemaModel {

  url: string = '';
  name: string = '';
  fileType: string;
  fileTypeUrl: string;

}

export class OnSiteModel {
  // EmployeeID: number;
  // EmployeeName: string;
  // EmployeeImage: any;
  // KeyTrade: string

  EmployeeID: number;

  EmployeeImage: any;
  EmployeeName: String;
  EndTime: any;
  KeyTrade: any;
  StartTime: any;
}