import { Component, OnInit, NgZone} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { ListingModel } from '../model/listing.model';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.css']
})

export class ViewListingComponent implements OnInit {

  pageHeading = 'Add Rental Market Listing';
  pageIntro = `Use this form to manually add a rental listing not scraped by the scraper tool.`;

  listing: ListingModel;
  getId: string | null = '';

  constructor(private crudService: CrudService, private ngZone: NgZone, private activatedRoute: ActivatedRoute) {
    this.listing = {
      title: '',
      description: '',
      source: '',
      source_url: '',
      month:'',
      house_type: '',
      unit_size: 1,
      town: '',
      street_name: '',
      postal_code: '',
      rent_amount: 1,
      utilities_included: false,
      landlord_type: '',
      length_of_term:''};
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getId = params['id'];
      if (this.getId !== null) {
        this.fetchData(this.getId);
      }
    });
  }

  fetchData(listingId: string): void {
    this.crudService.getListing(listingId).subscribe(
      (data) => {
        this.listing = data;
      }
    )
  }
}

