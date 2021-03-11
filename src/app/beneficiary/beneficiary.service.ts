import { Injectable } from '@angular/core';
import { RestApiService } from '../helpers/rest-api.service';
import { environment } from '../../environments/environment';
import { Action } from '../helpers/action';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  userAccountData: BehaviorSubject<any>;
  constructor(
    private restApiService: RestApiService,
    private router: Router) {
    this.userAccountData = new BehaviorSubject<any>(null);
  }

  get userAcccountData$(): Observable<any> {
    return this.userAccountData.asObservable();
  }


  /**
   * Deletes beneficiaries
   * @returns beneficiaries
   */
  deleteBeneficiaries(id?: number): Observable<any> {
    const baseParam: Action = {};
    baseParam.url = '/beneficiaries';
    return this.restApiService.delete(environment.mainUrl, baseParam, {}, Number(id))
      .pipe(map(response => response));
  }

  /**
   * Edits beneficiaries
   * @param accountData
   * Navigating to summary view
   */
  editBeneficiaries(accountData: any): Observable<any> {
    const baseParam: Action = {};
    baseParam.url = '/beneficiaries';
    return this.restApiService.put(environment.mainUrl, baseParam, {}, accountData, Number(accountData.id))
      .pipe(map(response => {
        this.router.navigate([`ibank`]);
      }));
  }
}
