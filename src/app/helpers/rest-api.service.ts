import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { Action } from './action';
import { Beneficiaries } from './entity/beneficiaries';
import { BankDetails } from './entity/bankDetails';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiURL: string = "http://localhost:3000";

  constructor(
    protected httpClient: HttpClient
  ) { }

  private baseURL = "http://localhost:3000/";

  getFavourites() {
    return this.httpClient.get(`${this.baseURL}beneficiaries`);
  }
  public getMethod(endPointUrl: string, baseParam: Action, httpOptions: {}): Observable<any> {
    return this.httpClient.get(`${endPointUrl}${baseParam.url}`, { ...httpOptions })
      .pipe(map(res => this.handleResponse(res)), catchError(error => this.handleHttpError('get', error)));
  }

  public postMethod(endPointUrl: string, baseParam: Action, httpOptions: {}, reqData: any): Observable<any> {
    return this.httpClient.post(`${endPointUrl}${baseParam.url}`, reqData, { ...httpOptions })
      .pipe(map(res => this.handleResponse(res)), catchError(error => this.handleHttpError('post', error)));
  }

  public put(endPointUrl: string, baseParam: Action, httpOptions: {}, reqData: any, id?: string | number): Observable<any> {
    return this.httpClient.put(`${endPointUrl}${baseParam.url}/${id}`, reqData, { ...httpOptions })
      .pipe(map(res => this.handleResponse(res)), catchError(error => this.handleHttpError('put', error)));
  }

  public delete(endPointUrl: string, baseParam: Action, httpOptions: {}, id: string | number): Observable<any> {
    return this.httpClient.delete(`${endPointUrl}${baseParam.url}/${id}`, { ...httpOptions })
      .pipe(map(res => this.handleResponse(res)), catchError(error => this.handleHttpError('delete', error)));
  }

  private handleResponse(res: Response | any): any {
    if (res.constructor === HttpResponse) {
      return res;
    } else {
      return res.body ? res.body : res || {};
    }
  }

  private handleHttpError<T>(operation = 'operation', error: Error | HttpErrorResponse): any {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {

      errMsg = `${error.status} - ${error.message || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Promise.reject(error);
  }

  public getHttpOptions(payload: any, baseParam: Action): any {
    const httpOptions: any = { params: payload.queryParams };
    if (payload.headers && payload.headers.get('responseType')) {
      httpOptions[`responseType`] = payload.headers.get('responseType');
    }
    if (payload.headers && payload.headers.get('observe')) {
      httpOptions[`observe`] = payload.headers.get('observe');
    }
    return httpOptions;
  }


}
