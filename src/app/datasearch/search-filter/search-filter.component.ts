import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})

export class SearchFilterComponent {

  //Define filter fields
  month: string = '';
  source: string = '';
  town: string = '';
  unit_size: string = '';
  house_type: string = '';
  keywords: string = '';

  @Output() searchClicked = new EventEmitter<any>();

  onSearchClick(): void {
    const filters = {
      month: this.month,
      source: this.source,
      town: this.town,
      unit_size: this.unit_size,
      house_type: this.house_type,
      keywords: this.keywords
    };

    this.searchClicked.emit(filters);
  }

  onResetClick(): void {
    const filters = {};
    this.month ='';
    this.source ='';
    this.town ='';
    this.unit_size ='';
    this.house_type ='';
    this.keywords ='';
    this.searchClicked.emit(filters);
  };



}


