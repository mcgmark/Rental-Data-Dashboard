import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../service/crud.service';
import { ListingModel } from '../../../model/listing.model';

@Component({
  selector: 'pop-type',
  templateUrl: './pop-type.component.html',
  styleUrls: ['./pop-type.component.css']
})
export class PopTypeComponent {
  constructor(private crudService: CrudService) { }

  Listings: ListingModel[] = [];
  mostPopularType: string = '';

  ngOnInit(): void {
    this.calculatePopularType();
  }

  calculatePopularType(): void {
    this.crudService.getListings().subscribe((res) => {
      if (res) {
        this.Listings = res.docs;
        const typeCount: { [key: string]: number } = {};
        this.Listings.forEach((listing: any) => {
          const typeName = listing.house_type;
          typeCount[typeName] = typeCount[typeName] ? typeCount[typeName] + 1 : 1;
        });
        let mostSeenTypeName: string = '';
        let highestCount = 0;
        Object.keys(typeCount).forEach((typeName: string) => {
          if (typeCount[typeName] > highestCount) {
            mostSeenTypeName = typeName;
            highestCount = typeCount[typeName];
          }
        });
        this.mostPopularType = mostSeenTypeName;
      }
    })
  }
}
