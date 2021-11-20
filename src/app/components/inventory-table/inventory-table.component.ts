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
    { programmable: boolean; parentId?: number; childrenIds?: number[] }
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
        this.programmableState[data.title_id] = {
          programmable: false,
          childrenIds: [],
        };
        data.seasons.forEach((season) => {
          const seasonId = season.season_id;
          this.programmableState[data.title_id].childrenIds?.push(seasonId);
          this.programmableState[seasonId] = {
            programmable: false,
            parentId: data.title_id,
            childrenIds: [],
          };
          season.episodes.forEach((episode) => {
            const episodeId = episode.episode_id;
            this.programmableState[seasonId].childrenIds?.push(episodeId);
            this.programmableState[episodeId] = {
              programmable: false,
              parentId: seasonId,
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
    const state = this.programmableState[id];
    state.programmable = programmable;
    // turn on seasons and episodes
    if (programmable) {
      state.childrenIds?.forEach((seasonId) => {
        this.turnOnSwitch(seasonId, { andChildren: true });
      });
    }
  }

  onSeasonSwitch(programmable: boolean, id: number) {
    const state = this.programmableState[id];
    state.programmable = programmable;
    // turn on parent title and episodes
    if (programmable) {
      this.turnOnSwitch(state.parentId!);
      state.childrenIds?.forEach((childId) => {
        this.turnOnSwitch(childId);
      });
    }
  }

  onEpisodeSwitch(programmable: boolean, id: number) {
    const state = this.programmableState[id];
    state.programmable = programmable;
    // turn on parent
    if (programmable) {
      this.turnOnSwitch(state.parentId!, { andParent: true });
    }
  }

  private turnOnSwitch(
    id: number,
    options?: { andChildren?: boolean; andParent?: boolean }
  ) {
    if (!id || !this.programmableState[id]) {
      return;
    }
    const state = this.programmableState[id];
    state.programmable = true;
    if (options?.andParent === true && state.parentId) {
      this.turnOnSwitch(state.parentId, options);
    }
    if (
      options?.andChildren === true &&
      state.childrenIds &&
      state.childrenIds.length > 0
    ) {
      state.childrenIds.forEach((childId) => {
        this.turnOnSwitch(childId, options);
      });
    }
  }
}
