import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  static page: string;
  static contacts = [];
  static contactTemplate = {};

  constructor() {}

  static getContacts(): object[] {return DataExchangeService.contacts; }
  static setContacts(value: object[]) {DataExchangeService.contacts = value; }

  static getContactTemplate(): object { return DataExchangeService.contactTemplate; }
  static setContactTemplate(value: object): void {DataExchangeService.contactTemplate = value; }

  static getPage(): string { return DataExchangeService.page; }
  static setPage(page: string) { DataExchangeService.page = page; }
}
