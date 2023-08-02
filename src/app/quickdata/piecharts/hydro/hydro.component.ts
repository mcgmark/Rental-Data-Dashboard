import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CrudService } from '../../../service/crud.service';
import Chart from 'chart.js/auto';

const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10px)' }), // Initial position
    animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })), // Final position
  ]),
]);

@Component({
  selector: 'hydro-chart',
  templateUrl: './hydro.component.html',
  styleUrls: ['./hydro.component.css'],
  animations: [fadeInAnimation],
})
export class HydroComponent {

  constructor(private crudService: CrudService) {}

  Listings:any[] = [];
  chart: any;
  data: any;
  sortedLabels: string[] = []

  colors = ['#235383', '#3978B8', '#539Be2', '#A5D0FA' ]

  getData(): void {
    const hydroCount: any = {};
    this.Listings.forEach((listing) => {
      const hydro = listing.utilities_included; // change this to be dynamic
      hydroCount[hydro] = hydroCount[hydro] ? hydroCount[hydro] + 1 : 1;
    });
    // Convert the houseTypeCount object to an array of key-value pairs
    const hydroCountArray: [string, number][] = Object.entries(hydroCount);

    // Sort the array based on the values in descending order
    hydroCountArray.sort((a, b) => b[1] - a[1]);

    // Reconstruct the sorted object from the sorted array
    const sortedHydroCount: { [key: string]: number } = {};
    hydroCountArray.forEach(([hydro, count]) => {
      sortedHydroCount[hydro] = count;
    });

   // Get all the keys of the sortedHouseTypeCount object
   const keys = Object.keys(sortedHydroCount);

   // If there are more than 3 keys, remove the keys after index 3
   if (keys.length > 3) {
     keys.splice(3);
   }

   // Create the final object with only the first 3 keys
   const finalHydroCount: { [key: string]: number } = {};
   keys.forEach((key) => {
     finalHydroCount[key] = sortedHydroCount[key];
   });

   // convert true and false to included and not included
   const modifiedHydroCount: { [key: string]: number } = {};
   Object.keys(finalHydroCount).forEach((key) => {
     if (key === 'true') {
       modifiedHydroCount['Included'] = finalHydroCount[key];
     } else if (key === 'false') {
       modifiedHydroCount['Not-Included'] = finalHydroCount[key];
     }
   });

   this.data = modifiedHydroCount; // set class variable for access in the view

  }

  createChart(): void {
    const dataValues = Object.values(this.data);
    const ctxFour = document.getElementById('includesHydroPie') as HTMLCanvasElement;
    this.chart = new Chart(ctxFour, {
      type: 'pie',
      data: {
        labels: Object.keys(this.data),
        datasets: [{
          data: dataValues,
          backgroundColor: this.colors,
        }],
      },
      options: {
        plugins: {
          legend: {
            display: false // Hide the default legend
          }
        }
      }
    });
  }

  trackByFn(index: number, item: string) {
    return index;
  }

  ngOnInit(): void {
    this.crudService.getListings().subscribe((res) => {
      if (res) {
        this.Listings = res.docs;
        this.getData();
        this.sortedLabels = Object.keys(this.data);
        this.createChart();
      }
    });
  }

}
