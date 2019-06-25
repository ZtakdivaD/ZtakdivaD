import {Injectable, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {FormControl} from '@angular/forms';
import {DataExchangeService} from './data-exchange.service';
import {HttpService} from './http.service';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService implements OnDestroy {

  subscription: Subscription;

  constructor(private snackBar: MatSnackBar,
              private http: HttpService) {
  }

  createSnackBar(msg) {
    this.snackBar.open(msg, null, {duration: 3000, panelClass: 'snack'});
  }

  errorMsgName(fc: FormControl, requiredMsg: string, patternMsg: string, err: string) {

    if (err === 'required') {
      return requiredMsg;
    }
    if (err === 'maxlength') {
      return patternMsg;
    }
  }
  errorMsgAmount(fc: FormControl, maxLengthMsg: string, patternMsg: string, err: string) {

    if (err === 'maxlength') {
      return maxLengthMsg;
    }
    if (err === 'pattern') {
      return patternMsg;
    }
  }

  refresh(page: string) {
    this.subscription = this.http.getAllContacts()
      .subscribe(
        (res) => {
          DataExchangeService.setPage(page);
        },
        (err) => {
          console.log(err);
          // this.createSnackBar(err.error.message);
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
