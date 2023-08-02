import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../service/crud.service';
import { ListingModel } from '../../../model/listing.model';

@Component({
  selector: 'pop-bedroom',
  templateUrl: './pop-bedroom.component.html',
  styleUrls: ['./pop-bedroom.component.css']
})
export class PopBedroomComponent {

  constructor(private crudService: CrudService) { }

  Listings: ListingModel[] = [];
  mostPopularBedrooms: string = '';

  ngOnInit(): void {
    this.calculateMostPopularBedrooms();
  }

  calculateMostPopularBedrooms(): void {
    this.crudService.getListings().subscribe((res) => {
      if (res) {
        this.Listings = res.docs;
        const bedroomsCount: { [key: number]: number } = {};
        this.Listings.forEach((listing: any) => {
          const bedroomsAmount = listing.unit_size;
          bedroomsCount[bedroomsAmount] = bedroomsCount[bedroomsAmount] ? bedroomsCount[bedroomsAmount] + 1 : 1;
        });
        let mostSeenBedroomsSize: number = 0;
        let highestCount = 0;
        Object.keys(bedroomsCount).forEach((bedroomsAmount: string) => {
          const count = bedroomsCount[Number(bedroomsAmount)]; // Convert back to number
          if (count > highestCount) {
            mostSeenBedroomsSize = Number(bedroomsAmount); // Convert back to number
            highestCount = count;
          }
        });

        // Use the switch statement to map the numeric unit sizes to strings
        let unitSizeMost: string;
        switch (mostSeenBedroomsSize) {
          case 0:
            unitSizeMost = "Studio";
            break;
          case 1:
            unitSizeMost = "1 Bedroom";
            break;
          case 2:
            unitSizeMost = "2 Bedroom";
            break;
          case 3:
            unitSizeMost = "3 Bedroom";
            break;
          case 4:
            unitSizeMost = "4+ Bedroom";
            break;
          default:
            unitSizeMost = "Null";
            break;
        }

        this.mostPopularBedrooms = unitSizeMost;
      }
    });
  }


}
