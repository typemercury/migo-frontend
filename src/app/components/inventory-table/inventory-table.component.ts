import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-table',
  template: `
    <table class="w-full">
      <th></th>
      <tr></tr>
    </table>
  `,
  styleUrls: ['./inventory-table.component.css'],
})
export class InventoryTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
