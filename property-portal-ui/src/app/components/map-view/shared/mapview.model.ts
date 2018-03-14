export class MapViewModel{
    user: any;
    name: string = '';
    imageUrl: string = '';
    isProject: boolean = false;
    propertyId: number = 0;
    projectId: number = 0;
}

export class ProjectModel{
    CompanyID:number=0;
    CompanyName:string='';
    CustomerID:number=0;
    JobId:number=0;
    JobNo:number=0;
    Latitude:number=0;
    LeadName:string='';
    Longitude:number=0;
    ProjectId:number=0;
    ProjectName:string='';
    customerName:string='';  
    thumbUrl:string='';    

    Address:String=''
}

export class PropertyModel{
    CompanyID: number=0;
    CompanyName:string=''
    CustomerID:number=0;
    CustomerName:string='';
    Description:string='';
    Latitude:number=0;
    Longitude:number=0;
    Name:string=''
    PropertyID:number=0;
    PropertyName:string='';
    thumbUrl:string='';
} 
