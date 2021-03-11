import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Renderer2, Input, OnDestroy } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  custCreateForm!: FormGroup;
  submitted = false;
  validPattern: any;
  bankName: any;
  isAlive: any;
  private destory$: Subject<boolean> = new Subject<boolean>();
  updateFav: any;
  acnId: number | undefined;
  customerName: string | undefined;
  get f() { return this.custCreateForm.controls; }
  constructor(
    private beneficiaryService: BeneficiaryService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.createForm();
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
    this.beneficiaryService.deleteBeneficiaries(Number(this.acnId))
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
          console.log(this.f);
          this.acnId = response.id;
          this.customerName = response.name;
          this.setData(response);
        }
      });
  }

  createForm() {
    this.custCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountnumber: ['', [Validators.required, Validators.minLength(20)]],
      bank: [''],
    });
  }
  onSubmit() {
    let accountDetails = this.custCreateForm.value;
    accountDetails = {
      ...accountDetails,
      id: this.acnId
    }
    this.beneficiaryService.editBeneficiaries(accountDetails)
      .subscribe(() => {
        this.router.navigate([`ibank`]);
      });
  }


  setData(response?: any) {

    this.custCreateForm.patchValue(response, { emitEvent: false });
  }
}
