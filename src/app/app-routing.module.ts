import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DetailsComponent} from './details/details.component';
import {TableComponent} from './table/table.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'table', pathMatch: 'full'
  },
  {path: 'table', component: TableComponent},
  {path: 'details', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
