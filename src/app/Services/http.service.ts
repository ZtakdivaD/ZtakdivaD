import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataExchangeService} from './data-exchange.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'https://upstartt3.herokuapp.com/';

  urlContacts = '/contact';

  constructor(private http: HttpClient) {
  }


  addContact(body): Observable<object> {
    return this.http.post(this.url + this.urlContacts, body);
  }

  editContact(body): Observable<object> {
    return this.http.put(this.url + this.urlContacts, body);
  }

  deleteContact(id): Observable<object> {
    return this.http.delete(this.url + this.urlContacts + '/' + id);
  }


  getAllContacts(): Observable<void> {
    return this.http.get(this.url + '/all')
      .pipe(map((res) => {
        DataExchangeService.setContacts((res as any));
        console.log(res);

      }));
  }

  getAll() {
    return this.http.get(this.url + '/all')
      .pipe(map((res) => res));
  }
}


