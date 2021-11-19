import { Component, Input, OnInit } from '@angular/core';
import { Inventory } from 'src/app/services/inventory-data';

@Component({
  selector: 'app-inventory-table',
  template: `
    <table class="w-full">
      <tr>
        <th *ngFor="let col of columns">{{ col }}</th>
      </tr>
      <!-- loop through titles -->
      <ng-container *ngFor="let data of dataSource">
        <tr>
          <td>{{ data.title_id }}</td>
          <td>{{ data.title_name }}</td>
          <td>{{ data.content_type }}</td>
          <td>{{ data.seasons?.length || '-' }}</td>
          <td>{{ data.episode_count }}</td>
          <td>{{ data.publish_timestamp | date: 'MMM d, y' }}</td>
          <td></td>
        </tr>
        <ng-container *ngIf="data.content_type === 'Series'">
          <!-- loop through seasons -->
          <ng-container *ngFor="let season of data.seasons">
            <tr style="background: red">
              <td>{{ season.season_id }}</td>
              <td>Season {{ season.season_number }}</td>
              <td>Season</td>
              <td>S{{ season.season_number }}</td>
              <td>{{ season.episode_count }}</td>
              <td>{{ season.publish_timestamp | date: 'MMM d, y' }}</td>
              <td></td>
            </tr>
            <!-- loop through episodes -->
            <tr
              *ngFor="let episode of season.episodes"
              style="background: blue"
            >
              <td>{{ episode.episode_id }}</td>
              <td>{{ episode.episode_name }}</td>
              <td>Episode</td>
              <td>-</td>
              <td>{{ episode.episode_number }}</td>
              <td>-</td>
              <td></td>
            </tr>
          </ng-container>
        </ng-container>
      </ng-container>
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
