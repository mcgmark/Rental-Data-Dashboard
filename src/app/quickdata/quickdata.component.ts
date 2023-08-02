import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quickdata',
  templateUrl: './quickdata.component.html',
  styleUrls: ['./quickdata.component.css']
})


export class QuickdataComponent implements OnInit {
    pageHeading = 'Rental Market Snapshot';
    pageIntro = 'Sorting through data can be a tedious task. Using some pretty cool technology we have done some of your homework for you. Based on our research we decided this is the most likely data you are looking for.';

    constructor(){};

    ngOnInit(): void {

    }


  }

