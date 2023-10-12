import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../service/notification.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'data-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})


export class DatatableComponent implements OnInit {
  pageHeading = 'Rental Market Data';
  pageIntro = `We've taken the initiative and searched the internet for rental listings. We collected all of the rental listings and now you're able to search through them for the data you need. Use our filters and search feature to narrow down your search results.`;

  Listings:any[] = [];

  currentPage: number = 1;
  totalPages: number = 0;

  isLoading: Boolean = true;

  sortField: string = 'title';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef,
    public AuthService: AuthService,
    private notificationService: NotificationService,
    private alertService: AlertService
    ){};


    onSearch(filters: any): void {
      this.currentPage = 1;
      this.fetchData(filters);
    }

    fetchData(filters?: any): void {
      this.crudService.getListings(this.currentPage, filters).subscribe((res) => {
        if (res) {
          this.Listings = res.docs;
          this.totalPages = res.totalPages;
          this.isLoading = false;
        }
      });
    }

    navigateToPage(pageNumber: number): void {
      // Update the 'page' query parameter using Angular's router
      this.currentPage = pageNumber;
      this.fetchData({});
    }

    delete(id: string, i: number): void {
      const message = 'Are you sure you want to delete this?';
      this.alertService.showAlertWithConfirm(message, (confirmed) => {
        if (confirmed) {
            this.crudService.deleteListing(id).subscribe((res) => {
              this.Listings.splice(i, 1);
              this.notificationService.showNotification('Listing Deleted!');
            });
        }
      });
    }

    onTableHeadingClicked(sortField: string): void {
      // Toggle sorting order when the same field is clicked again
      if (this.sortField === sortField) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = sortField;
        this.sortOrder = 'asc'; // Reset sorting order to 'asc' when sorting by a new field
      }
      this.sortListings();
    }

    sortListings(): void {
      this.Listings.sort((a, b) => {
        if (a[this.sortField] > b[this.sortField]) return this.sortOrder === 'asc' ? 1 : -1;
        if (a[this.sortField] < b[this.sortField]) return this.sortOrder === 'asc' ? -1 : 1;
        return 0;
      });
    }

    ngOnInit(): void {
      this.route.queryParams.subscribe((queryParams) => {
        this.currentPage = +queryParams['page'] || 1;
        this.fetchData();
      });
    }
}
