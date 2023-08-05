import { Component, Input, OnInit } from '@angular/core';
import { NotificationService  } from '../service/notification.service';

@Component({
  selector: 'notification-pop',
  templateUrl: './notification-pop.component.html',
  styleUrls: ['./notification-pop.component.css']
})

export class NotificationPopComponent implements OnInit {

  @Input() message: string ='';
  showNotification: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notificationMessage$.subscribe((message) => {
      // Show the notification only when there is a message
      if (message) {
        this.showNotification = true;
        // Set a timeout to hide the notification after 5 seconds
        setTimeout(() => {
          this.showNotification = false;
          
        }, 5000);
      }
    });
  }
}
