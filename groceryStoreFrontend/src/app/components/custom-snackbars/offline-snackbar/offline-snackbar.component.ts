import { Component, OnDestroy } from '@angular/core';
import { CommonMethodsHandler } from 'src/app/handlers/commonMethodsHandler';
import { ConnectionService } from 'src/app/services/connection/connection.service';

@Component({
  selector: 'app-offline-snackbar',
  templateUrl: './offline-snackbar.component.html',
  styleUrls: ['./offline-snackbar.component.scss']
})
export class OfflineSnackbarComponent implements OnDestroy {
  time: number;
  timeInterval;
  triesInterval;
  isTryingToReconnect = false;
  isConnectionEstablished = false;
  tries: number;

  constructor(private connectionService: ConnectionService, private commonMethodsHandler: CommonMethodsHandler) {}

  ngOnDestroy(): void {
    this.pauseTimer();
    this.commonMethodsHandler.hideOfflineServerLayer();
  }

  startTimer() : void {
    this.isTryingToReconnect = true;
    this.time = 1;
    this.tries = 0;
    this.tryToConnectToApi();
    this.timeInterval = setInterval(() => {
      this.time++;
    }, 1000);
    this.startTriesCounter();
  }

  startTriesCounter() : void {
    this.triesInterval = setInterval(() => {
      this.tryToConnectToApi();
    }, 5000);
  }

  pauseTimer() : void {
    clearInterval(this.timeInterval);
    clearInterval(this.triesInterval);
  }

  tryToConnectToApi() : void {
    this.connectionService.pingApi().subscribe(() => {
      this.pauseTimer();
      this.isTryingToReconnect = false;
      this.isConnectionEstablished = true;
    },
    () => this.tries++);
  }

  
}
