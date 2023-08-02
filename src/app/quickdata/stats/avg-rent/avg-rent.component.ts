import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../service/crud.service';
import { ListingModel } from '../../../model/listing.model';

@Component({
  selector: 'avg-rent',
  templateUrl: './avg-rent.component.html',
  styleUrls: ['./avg-rent.component.css']
})
export class AvgRentComponent implements OnInit {

  Listings: ListingModel[] = [];
  rentAverage: string | null = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.calculateRentAverage();
  }

  calculateRentAverage(): void {
    this.crudService.getListings().subscribe((res) => {
      if (res) {
        this.Listings = res.docs;
        let rentSum = 0;
        this.Listings.forEach((listing) => {
          rentSum += listing.rent_amount;
        });
        const rentAverage = rentSum / this.Listings.length;
        this.rentAverage = rentAverage.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
      }
    })
  }
}
