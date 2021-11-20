import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Inventory } from 'src/app/services/inventory-data';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css'],
})
export class InventoryTableComponent implements OnInit, OnChanges {
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

  expandState: Record<number, boolean> = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(
      '%c 🍉 changes: ',
      'font-size:20px;background-color: #6EC1C2;color:#fff;',
      changes
    );
    const { dataSource } = changes;
    if (dataSource.currentValue) {
      (dataSource.currentValue as Inventory[]).forEach((data) => {
        if (data.content_type === 'Series') {
          this.expandState[data.title_id] = false;
          data.seasons.forEach((season) => {
            this.expandState[season.season_id] = false;
          });
        }
      });
    }
  }

  toggleExpand(id: number) {
    if (this.expandState[id] !== undefined) {
      this.expandState[id] = !this.expandState[id];
    }
  }
}
