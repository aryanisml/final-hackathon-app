import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BeneficiaryService } from '../beneficiary.service';

@Component({
  selector: 'app-edit-benficairies',
  templateUrl: './edit-benficairies.component.html',
  styleUrls: ['./edit-benficairies.component.scss']
})
export class EditBenficairiesComponent implements OnInit, OnDestroy {

  private destory$: Subject<boolean> = new Subject<boolean>();
  updateFav: any;
  constructor(
    private beneficiaryService: BeneficiaryService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }


  /**
   * Deletes benficairies from system
   */
  delete(): void {
    this.beneficiaryService.deleteBeneficiaries(1)
      .pipe(takeUntil(this.destory$))
      .subscribe((response) => {
        this.router.navigate(['ibank/summary']);
      });
  }


  /**
   * Fetchs edit data
   */
  fetchData(): void {
    this.beneficiaryService.userAcccountData$
      .pipe(takeUntil(this.destory$))
      .subscribe(response => {
        if (response) {
          console.log(response);
        }
      });
  }


}
