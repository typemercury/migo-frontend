import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="w-full h-full flex">
      <img src="assets/navigation/elements/horizontal/logo/default.svg" />
      <img
        src="assets/navigation/elements/horizontal/items/on accent/label and icon/active.svg"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: fixed;
        top: 0px;
        z-index: 99;
        width: 100%;
        height: 64px;
        background-color: #e31e30;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
