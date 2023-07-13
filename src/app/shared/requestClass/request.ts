import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.services';
import { GlobalConstants } from '../constants/global.constants';


@Injectable({
    providedIn: 'root'
})

export class RequestClass {

    constructor(private http: HttpClient, private global: GlobalService) { }

    public postRequest(url, body): Observable<any> {
        return this.http.post(GlobalConstants.SERVER_URL + url, body);
    }
    public getRequest(URL: any): Observable<any> {
        return this.http.get(GlobalConstants.SERVER_URL + URL);
    }
    public getRequestPromise(URL: any) {
      return this.http.get(GlobalConstants.SERVER_URL + URL).toPromise();
    }

}
