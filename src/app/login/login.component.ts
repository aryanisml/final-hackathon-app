import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Users } from './users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destory$: Subject<boolean> = new Subject<boolean>();
  public loginForm: FormGroup | any;
  public submitted = false;
  public loading = false;
  public errormsg = false;
  get f(): any { return this.loginForm.controls; }

  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder) { }


  /**
   * on init
   */
  ngOnInit(): void {
    this.createForm();
  }

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }


  /**
   * Creates form
   */
  createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Determines whether submit on
   * @returns submit
   */
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const params: Users = {
      username: this.f.username.value,
      password: this.f.password.value
    };
    this.loginService.login(params)
      .pipe((takeUntil(this.destory$)))
      .subscribe((response) => {
        if (response && response.length > 0) {
          this.errormsg = false;
          this.router.navigate(['/ibank']);
        } else {
          this.errormsg = true;
          this.loading = false;
        }
      },
        catchError(async (error) => console.log(error)));

  }

}
