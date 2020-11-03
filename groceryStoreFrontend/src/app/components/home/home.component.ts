import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('dismiss', [
        state('closed', style({
            opacity: 1,
        })),
        state('open', style({
            opacity: 0,
        })),
        transition('closed => open', animate(450))
    ]),
]
})

export class HomeComponent {
  title = 'groceryStoreFrontend';
  isShoppingBtnClicked = false;
  state = "closed";
  areProductsVisible: boolean;

  triggerAnimation() : void {
    this.state = "open";
    this.hideStartShoppingBtn();
  }

  hideStartShoppingBtn() : void {
    setTimeout(() => {
      this.isShoppingBtnClicked = true;
    }, 500);
  }

  scrollToProducts(): void {
    this.areProductsVisible = true;
    setTimeout(() => {
      const element = document.querySelector("#products")
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 500);
  }
}
