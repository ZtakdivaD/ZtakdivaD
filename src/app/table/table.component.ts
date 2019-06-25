import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {HttpService} from '../Services/http.service';
import {UtilService} from '../Services/util.service';
import {DataExchangeService} from '../Services/data-exchange.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('open', style({})),
      state('closed', style({height: '0'})),

      transition('closed=>open', [animate('500ms')]),
      transition('open=>closed', [animate('300ms')])
    ])]
})
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  contacts = new MatTableDataSource([{}]);
  selectedCB = 0;
  expandedRow = null;
  displayedColumns = ['id', 'name', 'description', 'amount', 'date', 'isPrivate'];
  expandedElement = null;


  constructor(private http: HttpService,
              private util: UtilService, private router: Router) {
  }

  ngOnInit() {

    this.util.refresh('table');
    this.http.getAll().subscribe((resolve: any) => {
        console.log(resolve);
        this.contacts = new MatTableDataSource(resolve);
        console.log(this.contacts);
        this.contacts.sort = this.sort;
        this.contacts.paginator = this.paginator;
      },
      (eror) => {
        console.log(eror);
      });


    console.log(this.contacts);


  }

  ngAfterViewInit() {

    this.contacts.sort = this.sort;
    this.contacts.paginator = this.paginator;
  }


  applyFilter(filterValue: string) {
    this.contacts.filter = filterValue.trim().toLowerCase();
  }

  getInfo(obj) {
    const id = obj.id;
    if (id !== this.selectedCB) {
      this.selectedCB = id;
    } else {
      this.selectedCB = 0;
    }
  }


  stopProp(event) {
    event.stopPropagation();
  }

  addContact() {
    this.router.navigate(['details']);
  }

  editContact() {
    DataExchangeService.setContactTemplate(this.contacts.filteredData
      .find((c: any) => c.id === this.selectedCB));
    this.router.navigate(['details']);
  }

  removeContact() {
    this.http.deleteContact(this.selectedCB).subscribe((resolve: any) => {
        console.log(resolve);
        this.util.createSnackBar(resolve);
        this.refresh();
      },
      (eror) => {
        console.log(eror);
      });
  }

  refresh(): void {
    window.location.reload();
  }


}
