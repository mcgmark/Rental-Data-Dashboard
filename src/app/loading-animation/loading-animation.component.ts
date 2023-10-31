import { Component } from '@angular/core';

@Component({
  selector: 'loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.css']
})


export class LoadingAnimationComponent {
  loadingMessage: string = "";

  ngOnInit() {
    setInterval(() => {
      this.loadingMessage = "Still Loading, waking up API Server."
    }, 1700);
  }
}
