import { BeneficiaryService } from './../beneficiary.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestApiService } from 'src/app/helpers/rest-api.service';

export interface Favourities {
  id: number;
  accountnumber: string;
  name: string;
  bank: string;
}
@Component({
  selector: 'app-summary-beneficiary',
  templateUrl: './summary-beneficiary.component.html',
  styleUrls: ['./summary-beneficiary.component.scss']
})
export class SummaryBeneficiaryComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  obs: Observable<any> | undefined;
  ELEMENT_DATA: Favourities[] = [];
  dataSource: MatTableDataSource<Favourities> = new MatTableDataSource<Favourities>(this.ELEMENT_DATA);
  constructor(private changeDetectorRef: ChangeDetectorRef, private _service:RestApiService,
    private beneficiaryService: BeneficiaryService,
    private router: Router) { }


  ngOnInit(): void {

    this.getFavourities();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  getFavourities () {
    this._service.getFavourites().subscribe((data:any) => {

      this.dataSource.data = data;

      this.dataSource.paginator = this.paginator;

      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      return data;
    });
  }

  edit(data:any) {
    console.log('ee', data)
    this.beneficiaryService.editData.next(data);

   this.router.navigate(['ibank/edit'])
  }

}
