import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CommonMethodsHandler } from 'src/app/handlers/commonMethodsHandler';
import { ConnectionService } from 'src/app/services/connection/connection.service';

@Component({
  selector: 'app-offline-snackbar',
  templateUrl: './offline-snackbar.component.html',
  styleUrls: ['./offline-snackbar.component.scss'],
})
export class OfflineSnackbarComponent implements OnDestroy {
  time: number;
  timeInterval = interval(1000);
  timeSubscription: Subscription;
  triesInterval = interval(5000);
  triesSubscription: Subscription;
  isTryingToReconnect = false;
  isConnectionEstablished = false;
  tries: number;

  constructor(
    private connectionService: ConnectionService,
    private commonMethodsHandler: CommonMethodsHandler,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribeIntervals();
    this.commonMethodsHandler.hideOfflineServerLayer();
  }

  startTimer(): void {
    this.isTryingToReconnect = true;
    this.time = 1;
    this.tries = 0;
    this.tryToConnectToApi();
    this.subscribeIntervals();
  }

  private subscribeIntervals(): void {
    this.timeSubscription = this.timeInterval.subscribe(() => {
      this.time += 1;
    });

    this.triesSubscription = this.triesInterval.subscribe(() => {
      this.tryToConnectToApi();
    });
  }

  private unsubscribeIntervals(): void {
    this.timeSubscription.unsubscribe();
    this.triesSubscription.unsubscribe();
  }

  private tryToConnectToApi(): void {
    this.connectionService.pingApi().subscribe(
      () => {
        this.unsubscribeIntervals();
        this.isTryingToReconnect = false;
        this.isConnectionEstablished = true;
      },
      () => {
        this.tries += 1;
      },
    );
  }
}
