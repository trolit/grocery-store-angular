import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('dismiss', [
      state(
        'closed',
        style({
          opacity: 1,
        }),
      ),
      state(
        'open',
        style({
          opacity: 0,
        }),
      ),
      transition('closed => open', animate(450)),
    ]),
  ],
})
export class HomeComponent {
  title = 'groceryStoreFrontend';
  isShoppingBtnClicked = false;
  state = 'closed';
  areProductsVisible: boolean;

  triggerAnimation(): void {
    this.state = 'open';
    timer(800)
      .pipe(first())
      .subscribe(() => {
        this.isShoppingBtnClicked = true;
      });
  }

  scrollToProducts(): void {
    this.areProductsVisible = true;
    timer(500)
      .pipe(first())
      .subscribe(() => {
        const element = document.querySelector('#products');
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
  }
}
