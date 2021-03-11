import { Component, OnInit, Renderer2, Input, OnDestroy } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from '../../helpers/rest-api.service'
import { fromEvent } from 'rxjs'
import { rendererTypeName } from '@angular/compiler';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-new-beneficairies',
  templateUrl: './new-beneficairies.component.html',
  styleUrls: ['./new-beneficairies.component.scss']
})
export class NewBeneficairiesComponent implements OnInit {
  custCreateForm!: FormGroup;
  submitted = false;
  validPattern: any;
  bankName: any;
  isAlive: any;
  constructor(private formBuilder: FormBuilder, private restApiService: RestApiService, private router: Router,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.custCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      accountnumber: ['', [Validators.required, Validators.minLength(20)]],
      bank: [''],
    });
  }

  // getter for access to form fields
  get f() { return this.custCreateForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.custCreateForm.invalid) {
      return;
    }
    this.custCreateForm.value.bank=this.bankName;
    this.restApiService.addNewCustomer(this.custCreateForm.value);

    this.router.navigate(['ibank'])
    .then(() => {
      window.location.reload();
    });;
  }

  getBankName(value: any) {
    this.restApiService.getBankName(value.target.value).subscribe(res => {
      let Name: any = res;
      this.bankName = Name[0].bank;

    })

  }

}
