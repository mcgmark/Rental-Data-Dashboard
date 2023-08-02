import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../service/crud.service';
import { ListingModel } from '../../../model/listing.model';

@Component({
  selector: 'pop-month',
  templateUrl: './pop-month.component.html',
  styleUrls: ['./pop-month.component.css']
})

export class PopMonthComponent implements OnInit {

  constructor(private crudService: CrudService) { }

  Listings: ListingModel[] = [];
  mostPopularMonth: string = '';

  ngOnInit(): void {
    this.calculatePopularMonth();
  }

  calculatePopularMonth(): void {
    this.crudService.getListings().subscribe((res) => {
      if (res) {
        this.Listings = res.docs;
        const monthCount: { [key: string]: number } = {};
        this.Listings.forEach((listing: any) => {
          const monthName = listing.month;
          monthCount[monthName] = monthCount[monthName] ? monthCount[monthName] + 1 : 1;
        });
        let mostSeenMonthName: string = '';
        let highestCount = 0;
        Object.keys(monthCount).forEach((monthName: string) => {
          if (monthCount[monthName] > highestCount) {
            mostSeenMonthName = monthName;
            highestCount = monthCount[monthName];
          }
        });
        this.mostPopularMonth = mostSeenMonthName;
      }
    })
  }

}
