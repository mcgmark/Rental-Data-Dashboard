import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { QuickdataComponent } from './quickdata/quickdata.component';
import { DatachartsComponent } from './datacharts/datacharts.component';
import { DatasearchComponent } from './datasearch/datasearch.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { SearchFilterComponent } from './datasearch/search-filter/search-filter.component';

import { CurrencyPipe } from './pipes/currency.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

import { AuthGuard } from './guard/auth.guard';

import { AvgRentComponent } from './quickdata/stats/avg-rent/avg-rent.component';
import { PopMonthComponent } from './quickdata/stats/pop-month/pop-month.component';
import { PopTypeComponent } from './quickdata/stats/pop-type/pop-type.component';
import { PopBedroomComponent } from './quickdata/stats/pop-bedroom/pop-bedroom.component';
import { BedroomsComponent } from './quickdata/piecharts/bedrooms/bedrooms.component';
import { TypeComponent } from './quickdata/piecharts/type/type.component';
import { MonthComponent } from './quickdata/piecharts/month/month.component';
import { HydroComponent } from './quickdata/piecharts/hydro/hydro.component';
import { TotalmonthComponent } from './datacharts/totalmonth/totalmonth.component';
import { AuthComponent } from './auth/auth.component';
import { LoginformComponent } from './auth/loginform/loginform.component';
import { RegisterformComponent } from './auth/registerform/registerform.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    QuickdataComponent,
    DatachartsComponent,
    DatasearchComponent,
    AddListingComponent,
    ViewListingComponent,
    SearchFilterComponent,
    CurrencyPipe,
    TruncatePipe,
    AvgRentComponent,
    PopMonthComponent,
    PopTypeComponent,
    PopBedroomComponent,
    BedroomsComponent,
    TypeComponent,
    MonthComponent,
    HydroComponent,
    TotalmonthComponent,
    AuthComponent,
    LoginformComponent,
    RegisterformComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})


export class AppModule {




}
