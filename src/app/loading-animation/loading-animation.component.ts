import { Component } from '@angular/core';

@Component({
  selector: 'loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.css']
})


export class LoadingAnimationComponent {
  loadingMessage: string = "";

  ngOnInIt() {
    setInterval(() => {
      this.loadingMessage = "Still Loading, Waking up API Server."
    }, 1500);
  }
}
