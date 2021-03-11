import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiPayload } from '../helpers/api-payload';
import { RestApiService } from '../helpers/rest-api.service';
import { Users } from './users';
import { environment } from '../../environments/environment';
import { Action } from '../helpers/action';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private restApiService: RestApiService,
    private formBuilder: FormBuilder) { }


  /**
   * Gets forms
   * @returns formGroup
   */
  getForms(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  /**
   * Logins login service
   * @param userData
   * @returns login
   */
  login(userData: Users): Observable<Array<Users>> {
    const params = {
      username: userData.username,
      password: userData.password,
    };
    const payload = new ApiPayload(params);
    const baseParam: Action = {};
    baseParam.url = '/users';
    const httpOptions = this.restApiService.getHttpOptions(payload, baseParam);
    return this.restApiService
      .getMethod(environment.mainUrl, baseParam, httpOptions)
      .pipe(map((response) => response));
  }

}
