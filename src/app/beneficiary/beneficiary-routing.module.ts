import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficairiesComponent } from './beneficairies/beneficairies.component';
import { EditBenficairiesComponent } from './edit-benficairies/edit-benficairies.component';
import { NewBeneficairiesComponent } from './new-beneficairies/new-beneficairies.component';
import { SummaryBeneficiaryComponent } from './summary-beneficiary/summary-beneficiary.component';

const routes: Routes = [
  {
    path: '',
    component: BeneficairiesComponent,
    children: [
      {
        path: 'summary',
        component: SummaryBeneficiaryComponent
      }, {
        path: 'add',
        component: NewBeneficairiesComponent
      }, {
        path: 'edit',
        component: EditBenficairiesComponent
      },
      {
        path: '',
        component: SummaryBeneficiaryComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiaryRoutingModule { }
