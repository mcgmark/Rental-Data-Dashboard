import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ListingModel } from '../model/listing.model';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})

export class AddListingComponent implements OnInit {

  pageHeading = 'Add Rental Market Listing';
  pageIntro = `Use this form to manually add a rental listing not scraped by the scraper tool.`;

  createForm: FormGroup;
  ListingModel: ListingModel;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService
  ) {

    this.ListingModel = new ListingModel();

    this.createForm = this.formBuilder.group({
      title: [''],
      description: [''],
      source: [''],
      source_url: [''],
      month: [''],
      house_type: [''],
      unit_size: [''],
      town: [''],
      street_name: [''],
      postal_code: [''],
      rent_amount: [''],
      utilities_included: [''],
      landlord_type: [''],
      length_of_term: ['']
    })
  }

  ngOnInit() { }

  submitListing(): any {
    this.crudService.addListing(this.createForm.value).subscribe(
      (res) => {
        const newListing = res._id;
        this.router.navigate(['/listings', newListing]);
      },
    );
  }
}
