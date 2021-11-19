import { Component, Input, OnInit } from '@angular/core';
import { Inventory } from 'src/app/services/inventory-data';

@Component({
  selector: 'app-inventory-table',
  template: `
    <table class="w-full">
      <tr>
        <th *ngFor="let col of columns">{{ col }}</th>
      </tr>
      <tr *ngFor="let data of dataSource">
        <td>{{ data.title_id }}</td>
        <td>{{ data.title_name }}</td>
        <td>{{ data.content_type }}</td>
        <td>{{ data.seasons?.length || '-' }}</td>
        <td>{{ data.episode_count }}</td>
        <td>{{ data.publish_timestamp | date: 'MMM d, y' }}</td>
        <!-- TODO: Programmable -->
        <td></td>
      </tr>
    </table>
  `,
  styleUrls: ['./inventory-table.component.css'],
})
export class InventoryTableComponent implements OnInit {
  columns = [
    'ID',
    'Title Name',
    'Type',
    'Season',
    'Episode',
    'Published',
    'Programmable',
  ];
  @Input() dataSource: Inventory[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
