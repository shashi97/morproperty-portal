export class ApiUrl {

  static serverMode = false;

  static localUrl = 'http://localhost';
  static serverUrl = 'http://go.nationaldecorators.co.nz';

  static baseUrl: string = ApiUrl.serverMode === true ? ApiUrl.serverUrl : ApiUrl.localUrl;


  static prodMode = true; /* this is for production or development url */
  static LOGIN_URI_PORT = ApiUrl.prodMode === true ? ':46001/' : ':46001/';
  static MAIN_URI_PORT = ApiUrl.prodMode === true ? ':46001/' : ':46001/';
  static DOCUMENT_STORE_URI_PORT = ApiUrl.prodMode === true ? ':46001/' : ':46001/';


  static LOGIN_URI = ApiUrl.baseUrl + ApiUrl.LOGIN_URI_PORT;
  static MAIN_URI = ApiUrl.baseUrl + ApiUrl.MAIN_URI_PORT;
  static DOCUMENT_STORE_URI = ApiUrl.baseUrl + ApiUrl.DOCUMENT_STORE_URI_PORT;
}


