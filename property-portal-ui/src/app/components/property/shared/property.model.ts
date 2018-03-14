export class PropertyModel {
  PropertyID: Number;
  Name: string='';
  Description: string;
  CustomerID: Number;
  CustomerName: string;
  thumbUrl: string;
}

export class PropertyImageModel {
  imageUrl:string;
}

export class PropertyProjectModel {
  CustomerID:number;
  CustomerName:string;
  JobId: number;
  JobNo:number;
  LeadName:string;
  Name:string;
  PropertyID:number;
  projectUrl:string;
  }