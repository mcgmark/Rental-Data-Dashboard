import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { ListingModel } from '../model/listing.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quickdata',
  templateUrl: './quickdata.component.html',
  styleUrls: ['./quickdata.component.css']
})


export class QuickdataComponent implements OnInit {

    Listings: ListingModel[] = [];
    isLoading: boolean = true;
    dataSubscription: Subscription | undefined;

    pageHeading = 'Rental Market Snapshot';
    pageIntro = 'Sorting through data can be a tedious task. Using some pretty cool technology we have done some of your homework for you. Based on our research we decided this is the most likely data you are looking for.';

    constructor(private crudService: CrudService){};

    ngOnInit(): void {
        this.dataSubscription = this.crudService.getListings().subscribe({
          next: (res) => {
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading data:', error);
          },
        });
      };

    ngOnDestroy(): void {
      if (this.dataSubscription) {
        this.dataSubscription.unsubscribe();
      }
    }
  }

