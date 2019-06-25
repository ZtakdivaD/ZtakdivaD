import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Observable, Subscription} from 'rxjs';
import {HttpService} from '../Services/http.service';
import {UtilService} from '../Services/util.service';
import {DataExchangeService} from '../Services/data-exchange.service';
import {Router} from '@angular/router';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}]
})
export class DetailsComponent implements OnInit, OnDestroy {

  static notEmptyPattern = '^\\S.*';

  contact;
  progflag = false;

  private result: Observable<object>;

  addEditSubscription: Subscription;
  detailsFG: FormGroup;

  constructor(private http: HttpService,
              private util: UtilService, private router: Router, private adapter: DateAdapter<any>) {
  }

  ngOnInit() {
    this.progflag = true;
    const notEmpty: any[] = [Validators.required, Validators.pattern(DetailsComponent.notEmptyPattern)];

    this.contact = DataExchangeService.getContactTemplate();

    this.detailsFG = new FormGroup({
      id: new FormControl(this.contact.id || '', notEmpty),
      amount: new FormControl(this.contact.amount || '', [Validators.pattern('\\d{0,999999}'), Validators.maxLength(6)]),
      description: new FormControl(this.contact.description || ''),
      priv: new FormControl(this.contact.priv || ''),
      name: new FormControl(this.contact.name || '', [Validators.maxLength(100)]),
      date: new FormControl(this.contact.date || '', notEmpty)
    });
    this.progflag = false;
  }

  see() {
    const {isPrivate} = this.detailsFG.value;
    console.log(this.detailsFG);
    console.log(isPrivate);
    // const {name} = this.detailsFG.value;
    //   console.log(name.value);
  }

  getNameError(err) {
    return this.util.errorMsgName(name, 'required', 'max length 100 characters', err);
  }


  getAmountError(err) {
    const {amount} = this.detailsFG.value;
    //   console.log(name.value);
    return this.util.errorMsgAmount(amount, 'max length 6 characters', 'must be a number', err);
  }


  onSubmit() {
    console.log(this.detailsFG.value);
    // this.result = this.http.addContact(this.detailsFG.value);
    const {isPrivate} = this.detailsFG.value;
    isPrivate === !isPrivate;

    console.log(this.contact.id);
    if (this.contact.id === undefined) {
      this.result = this.http.addContact(this.detailsFG.value);

      this.router.navigate(['table']);
    } else {
      this.detailsFG.value.id = this.contact.id;
      this.result = this.http.editContact(this.detailsFG.value);
      this.router.navigate(['table']);

    }
    this.addEditSubscription = this.result
      .subscribe(
        () => {
          this.util.refresh('table');
        },
        (error) => {
          this.util.createSnackBar(error.error.message);
        }
      );

  }

  cancelAction() {
    DataExchangeService.setContactTemplate(this.contact = {});
    this.router.navigate(['table']);
  }

  ngOnDestroy() {
    // this.addEditSubscription.unsubscribe();
  }
}
