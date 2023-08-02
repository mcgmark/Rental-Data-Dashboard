export class ListingModel {
  title: String;
  description: String;
  source: String;
  source_url: String;
  month: String;
  house_type: String;
  unit_size: Number;
  town: String;
  street_name: String;
  postal_code: String;
  rent_amount: number;
  utilities_included: Boolean;
  landlord_type: String;
  length_of_term: String;

  constructor() {
    this.title = '';
    this.description = '';
    this.source = '';
    this.source_url = '';
    this.month = '';
    this.house_type = '';
    this.unit_size = 1;
    this.town = '';
    this.street_name = '';
    this.postal_code = '';
    this.rent_amount = 0;
    this.utilities_included = false;
    this.landlord_type = '';
    this.length_of_term = '';
  }

}
