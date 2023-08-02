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
  selector: 'month-chart',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
  animations: [fadeInAnimation],
})
export class MonthComponent implements OnInit {

  constructor(private crudService: CrudService) {}

  Listings:any[] = [];
  chart: any;
  data: any;
  sortedLabels: string[] = []

  colors = ['#235383', '#3978B8', '#539Be2', '#A5D0FA' ]

  getData(): void {
    const monthCount: any = {};
    this.Listings.forEach((listing) => {
      const month = listing.month; // change this to be dynamic
      monthCount[month] = monthCount[month] ? monthCount[month] + 1 : 1;
    });
    // Convert the houseTypeCount object to an array of key-value pairs
    const monthCountArray: [string, number][] = Object.entries(monthCount);

    // Sort the array based on the values in descending order
    monthCountArray.sort((a, b) => b[1] - a[1]);

    // Reconstruct the sorted object from the sorted array
    const sortedMonthCount: { [key: string]: number } = {};
    monthCountArray.forEach(([month, count]) => {
      sortedMonthCount[month] = count;
    });

   // Get all the keys of the sortedHouseTypeCount object
   const keys = Object.keys(sortedMonthCount);

   // If there are more than 3 keys, remove the keys after index 3
   if (keys.length > 3) {
     keys.splice(3);
   }

   // Create the final object with only the first 3 keys
   const finalMonthCount: { [key: string]: number } = {};
   keys.forEach((key) => {
     finalMonthCount[key] = sortedMonthCount[key];
   });

   this.data = finalMonthCount;
  }

  createChart(): void {
    const dataValues = Object.values(this.data);
    const ctxThree = document.getElementById('busiestMonthsPie') as HTMLCanvasElement;
    this.chart = new Chart(ctxThree, {
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
