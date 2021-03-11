import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiaryRoutingModule } from './beneficiary-routing.module';
import { BeneficairiesComponent } from './beneficairies/beneficairies.component';
import { NewBeneficairiesComponent } from './new-beneficairies/new-beneficairies.component';
import { EditBenficairiesComponent } from './edit-benficairies/edit-benficairies.component';
import { SummaryBeneficiaryComponent } from './summary-beneficiary/summary-beneficiary.component';

@NgModule({
  declarations: [
    BeneficairiesComponent,
    NewBeneficairiesComponent,
    EditBenficairiesComponent,
    SummaryBeneficiaryComponent
  ],
  imports: [
    CommonModule,
    BeneficiaryRoutingModule
  ]
})
export class BeneficiaryModule { }
