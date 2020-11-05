import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  productNameInput: string;
  productCategorySelect: string;

  ngOnInit(): void {
    this.productNameInput = '';
  }

  onInputChange(inputValue: string): void {
    this.productNameInput = inputValue;
  }

  clearInput(id: string): void {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.value = '';
  }
}
