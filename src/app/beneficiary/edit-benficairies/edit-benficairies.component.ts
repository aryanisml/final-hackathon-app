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
  updateFav:any;
  constructor(
    private beneficiaryService: BeneficiaryService,
    private router: Router) {
      this.beneficiaryService.cast.subscribe((data) => {
        console.log('Data:', data);
        this.updateFav = data;
      })
     }

  ngOnInit(): void {
    console.log(this.updateFav)
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  delete(): void {
    this.beneficiaryService.deleteBeneficiaries(1)
      .pipe(takeUntil(this.destory$))
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['ibank/summary']);
      });
  }


}
