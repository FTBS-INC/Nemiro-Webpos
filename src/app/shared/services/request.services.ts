import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { GlobalService, } from '../services';

@Injectable({
  providedIn: 'root'
})
export class RequestServices {
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }
  // private _http: Http,
  public postRequest(url, body): Observable<any> {
    return this.http.post(this.global.settings.API_URL + url, body);
  }
  public getRequest(URL: any): Observable<any> {
    return this.http.get(this.global.settings.API_URL + URL);
  }
  public postCDNRequest(url, body): Observable<any> {
    return this.http.post(this.global.settings.XVMS_CDN_API + url, body);
  }
  public getCDNRequest(URL: any): Observable<any> {
    return this.http.get(this.global.settings.XVMS_CDN_API + URL);
  }
  public postRequestForStaticFiles(url, body): Observable<any> {
    return this.http.post(this.global.settings.CMS_STATIC_FILES_API + url, body);
  }
  // License calls
  public postLicenseRequest(url, body): Observable<any> {
    return this.http.post(this.global.settings.LICENSE_API_URL + url, body);
  }
  public getLicenseRequest(URL: any): Observable<any> {
    return this.http.get(this.global.settings.LICENSE_API_URL + URL);
  }
  //tickerURL
  public getRequestTicker(URL: any): Observable<any> {
    return this.http.get(this.global.settings.XVMS_CDN_API + URL);
  }
  public postRequestTicker(url, body): Observable<any> {
    return this.http.post(this.global.settings.XVMS_CDN_API + url, body);
  }
}
