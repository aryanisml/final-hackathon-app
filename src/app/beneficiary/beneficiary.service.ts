import { Injectable } from '@angular/core';
import { RestApiService } from '../helpers/rest-api.service';
import { environment } from '../../environments/environment';
import { Action } from '../helpers/action';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {


  editData = new Subject<any>();
    cast = this.editData.asObservable();
  constructor(private restApiService: RestApiService) { }

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


}
