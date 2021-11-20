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
  programmableState: Record<
    number,
    { parentId?: number; programmable: boolean }
  > = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const { dataSource } = changes;
    if (dataSource.currentValue) {
      (dataSource.currentValue as Inventory[]).forEach((data) => {
        if (data.content_type === 'Series') {
          this.expandState[data.title_id] = false;
          data.seasons.forEach((season) => {
            this.expandState[season.season_id] = false;
          });
        }
        this.programmableState[data.title_id] = { programmable: false };
        data.seasons.forEach((season) => {
          this.programmableState[season.season_id] = {
            parentId: data.title_id,
            programmable: false,
          };
          season.episodes.forEach((episode) => {
            this.programmableState[episode.episode_id] = {
              parentId: season.season_id,
              programmable: false,
            };
          });
        });
      });
    }
  }

  toggleExpand(id: number) {
    if (this.expandState[id] !== undefined) {
      this.expandState[id] = !this.expandState[id];
    }
  }

  onTitleSwitch(programmable: boolean, id: number) {
    console.log(
      '%c 🍰 onTitleSwitch: ',
      'font-size:20px;background-color: #F5CE50;color:#fff;',
      programmable
    );
    this.programmableState[id].programmable = programmable;
  }

  onSeasonSwitch(programmable: boolean, id: number) {
    console.log(
      '%c 🥚 onSeasonSwitch: ',
      'font-size:20px;background-color: #FCA650;color:#fff;',
      programmable
    );
    this.programmableState[id].programmable = programmable;
    if (programmable) {
      this.onTitleSwitch(true, this.programmableState[id].parentId!);
    }
  }

  onEpisodeSwitch(programmable: boolean, id: number) {
    console.log(
      '%c 🍒 onEpisodeSwitch: ',
      'font-size:20px;background-color: #4b4b4b;color:#fff;',
      programmable
    );
    this.programmableState[id].programmable = programmable;
    // turn on season
    if (programmable) {
      this.onSeasonSwitch(true, this.programmableState[id].parentId!);
    }
  }
}
