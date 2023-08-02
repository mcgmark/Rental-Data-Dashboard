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
  selector: 'type-chart',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
  animations: [fadeInAnimation],
})
export class TypeComponent implements OnInit {

  constructor(private crudService: CrudService) {}

  Listings:any[] = [];
  chart: any;
  data: any;
  sortedLabels: string[] = []

  colors = ['#235383', '#3978B8', '#539Be2', '#A5D0FA' ]

  getData(): void {
    const houseTypeCount: any = {};
    this.Listings.forEach((listing) => {
      const houseType = listing.house_type; // change this to be dynamic
      houseTypeCount[houseType] = houseTypeCount[houseType] ? houseTypeCount[houseType] + 1 : 1;
    });
    // Convert the houseTypeCount object to an array of key-value pairs
    const houseTypeCountArray: [string, number][] = Object.entries(houseTypeCount);

    // Sort the array based on the values in descending order
    houseTypeCountArray.sort((a, b) => b[1] - a[1]);

    // Reconstruct the sorted object from the sorted array
    const sortedHouseTypeCount: { [key: string]: number } = {};
    houseTypeCountArray.forEach(([houseType, count]) => {
      sortedHouseTypeCount[houseType] = count;
    });

   // Get all the keys of the sortedHouseTypeCount object
   const keys = Object.keys(sortedHouseTypeCount);

   // If there are more than 4 keys, remove the keys after index 4
   if (keys.length > 3) {
     keys.splice(3);
   }

   // Create the final object with only the first 4 keys
   const finalHouseTypeCount: { [key: string]: number } = {};
   keys.forEach((key) => {
     finalHouseTypeCount[key] = sortedHouseTypeCount[key];
   });

   this.data = finalHouseTypeCount;
  }

  createChart(): void {
    const dataValues = Object.values(this.data);
    const ctxTwo = document.getElementById('buildingTypePie') as HTMLCanvasElement;
    this.chart = new Chart(ctxTwo, {
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
