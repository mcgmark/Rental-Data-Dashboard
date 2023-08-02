import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuickdataComponent } from './quickdata/quickdata.component';
import { DatachartsComponent } from './datacharts/datacharts.component';
import { DatasearchComponent } from './datasearch/datasearch.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { LoginformComponent } from './auth/loginform/loginform.component';
import { RegisterformComponent } from './auth/registerform/registerform.component';

import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
  { path: '', redirectTo: '/quick-data', pathMatch: 'full' },
  { path: 'quick-data', component: QuickdataComponent },
  { path: 'data-charts', component: DatachartsComponent },
  { path: 'listings', component: DatasearchComponent },
  { path: 'listings/add-listing', component: AddListingComponent, canActivate: [AuthGuard] },
  { path: 'listings/:id', component: ViewListingComponent },
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginformComponent },
  { path: 'auth/register', component: RegisterformComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
