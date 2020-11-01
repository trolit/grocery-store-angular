import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonMethodsHandler {
    offlineServerLayer = document.getElementById('offlineServerLayer');

    displayOfflineServerLayer() : void {
        this.offlineServerLayer.style.display = 'block';
    }

    hideOfflineServerLayer() : void {
        this.offlineServerLayer.style.display = 'none';
    }
}