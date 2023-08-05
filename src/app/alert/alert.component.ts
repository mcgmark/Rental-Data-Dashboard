import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'alert-box',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: string = '';
  showAlert: boolean = false;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alertMessage$.subscribe((message) => {
      // Show the notification only when there is a message
      if (message) {
        this.message = message;
        this.showAlert = true;
      }
    });
  }

  onConfirm(): void {
    this.alertService.confirm(true); // Pass true to indicate the user confirmed
    this.showAlert = false; // Hide the alert box after confirmation
  }

  onCancel(): void {
    this.alertService.confirm(false);
    this.showAlert = false; // Hide the alert box after cancel
  }
}
