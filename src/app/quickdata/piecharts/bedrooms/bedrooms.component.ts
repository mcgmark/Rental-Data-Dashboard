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
  selector: 'bedrooms-chart',
  templateUrl: './bedrooms.component.html',
  styleUrls: ['./bedrooms.component.css'],
  animations: [fadeInAnimation],
})


export class BedroomsComponent implements OnInit {

  constructor(private crudService: CrudService) {}

  Listings:any[] = [];
  chart: any;
  data: number[] = [];
  sortedLabels: string[] = []

  colors = ['#3978B8', '#235383', '#539Be2', '#A5D0FA']

  getData(): void {
    const unitSizesCount: any = {};
    this.Listings.forEach((listing) => {
      const unitSize = listing.unit_size;
      unitSizesCount[unitSize] = unitSizesCount[unitSize] ? unitSizesCount[unitSize] + 1 : 1;
    });
    this.data = unitSizesCount;
  }

  createChart(): void {
    const dataValues = Object.values(this.data);
    const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.data),
        datasets: [{
          data: dataValues,
          backgroundColor: this.colors,
        }],
      },
      options: {
        responsive: true,
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


