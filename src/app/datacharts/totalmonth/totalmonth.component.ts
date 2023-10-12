import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'total-month-chart',
  templateUrl: './totalmonth.component.html',
  styleUrls: ['./totalmonth.component.css']
})
export class TotalmonthComponent implements OnInit {

  constructor(private crudService: CrudService) {}

  Listings:any[] = [];
  chart: any;
  data: any;
  sortedLabels: string[] = []
  isLoading: Boolean = true;

  getData(): void {
    const monthCount: any = {};
    this.Listings.forEach((listing) => {
      const month = listing.month; // change this to be dynamic
      monthCount[month] = monthCount[month] ? monthCount[month] + 1 : 1;
    });
    // Convert the houseTypeCount object to an array of key-value pairs
    const monthCountArray: [string, number][] = Object.entries(monthCount);

    // Sort the array based on the values in descending order
    monthCountArray.sort((a, b) => a[1] - b[1]);

    // Reconstruct the sorted object from the sorted array
    const sortedMonthCount: { [key: string]: number } = {};
    monthCountArray.forEach(([month, count]) => {
      sortedMonthCount[month] = count;
    });

   this.data = sortedMonthCount;
  }

  createChart(): void {
    const dataValues = Object.values(this.data);
    const ctx = document.getElementById('rentalsChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(this.data),
        datasets: [{
            label: 'Rentals Total Per Month',
            data: dataValues,
            fill: false,
            borderColor: 'rgb(12, 15, 129)',
            tension: 0.1
        }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
      }
    });
  }

  ngOnInit(): void {
    this.crudService.getListings().subscribe((res) => {
      if (res) {
        this.Listings = res.docs;
        this.getData();
        this.sortedLabels = Object.keys(this.data);
        this.createChart();
        this.isLoading = false;
      }
    });
  }

}
