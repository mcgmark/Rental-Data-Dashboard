import { Injectable } from '@angular/core';
import { ListingModel } from '../model/listing.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // Node/Express API
  private REST_API: string = 'http://localhost:8000/api';

  // Http Header
  private httpHeaders: HttpHeaders;

  token = localStorage.getItem('token');

  constructor(private httpClient: HttpClient) {

    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
      });
  }


  // Get all listings
  getListings(page?: number, filters?: any): Observable<any> {
    let queryParams = '';

    if (page) {
      queryParams += `page=${page}`;
    }

    if (filters) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          queryParams += `&${key}=${encodeURIComponent(filters[key])}`;
        }
      }
    }
    const apiUrl = `${this.REST_API}/listings?${queryParams}`;
    return this.httpClient.get(apiUrl);
  }

  // Get single listing
  getListing(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/listings/${id}`;
    return this.httpClient.get(API_URL);
  }

  // Add
  addListing(data: ListingModel): Observable<any> {
    let API_URL = `${this.REST_API}/add-listing`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      )
  }

  // Edit Listing
  editListing(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/edit-listing/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete Listing
  deleteListing(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-listing/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
        catchError(this.handleError)
      )
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
