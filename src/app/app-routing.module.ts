import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuickdataComponent } from './quickdata/quickdata.component';
import { DatachartsComponent } from './datacharts/datacharts.component';
import { ListingsComponent } from './listings/listings.component';
import { DatatableComponent } from './listings/datatable/datatable.component';
import { AddListingComponent } from './listings/add-listing/add-listing.component';
import { ViewListingComponent } from './listings/view-listing/view-listing.component';
import { LoginformComponent } from './auth/loginform/loginform.component';
import { RegisterformComponent } from './auth/registerform/registerform.component';

import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
  { path: '', redirectTo: '/quick-data', pathMatch: 'full' }, // Redirect root to /quick-data
  { path: 'quick-data', component: QuickdataComponent, data: { breadcrumbLabel: 'Analytics' } },
  { path: 'data-charts', component: DatachartsComponent, data: { breadcrumbLabel: 'Charts' } },
  {
    path: 'listings',
    component: ListingsComponent,
    data: { breadcrumbLabel: 'Listings' },
    children: [
      { path: '', component: DatatableComponent, data: { breadcrumbLabel: 'Search' } }, // Default child route
      { path: 'data-search', component: DatatableComponent, data: { breadcrumbLabel: 'Search' } },
      { path: 'add-listing', component: AddListingComponent, canActivate: [AuthGuard], data: { breadcrumbLabel: 'Add Listing' } },
      { path: ':id', component: ViewListingComponent, data: { breadcrumbLabel: 'View Listing' } },
    ],
  },
  {
    path: 'auth',
    data: { breadcrumbLabel: 'Auth' },
    children: [
      { path: '', component: LoginformComponent, data: { breadcrumbLabel: 'Login' } }, // Default child route
      { path: 'login', component: LoginformComponent, data: { breadcrumbLabel: 'Login' } },
      { path: 'register', component: RegisterformComponent, data: { breadcrumbLabel: 'Register' } },
    ],
  },
  // Add a wildcard route for handling unknown routes
  { path: '**', redirectTo: '/quick-data' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
