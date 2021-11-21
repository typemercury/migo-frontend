import {
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Episode, Inventory, Season } from 'src/app/services/inventory-data';

const expandAnimation = animation([
  style({ transform: 'translateY(100%)', opacity: 0 }),
  animate('100ms', style({ transform: 'translateY(0)', opacity: 1 })),
]);
const collapseAnimation = animation([
  style({ transform: 'translateY(0)', opacity: 1 }),
  animate('100ms', style({ transform: 'translateY(100%)', opacity: 0 })),
]);

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css'],
  animations: [
    trigger('seasonAnimation', [
      transition(':enter', [useAnimation(expandAnimation)]),
      transition(':leave', [useAnimation(collapseAnimation)]),
    ]),
    trigger('episodeAnimation', [
      transition(':enter', [useAnimation(expandAnimation)]),
      transition(':leave', [useAnimation(collapseAnimation)]),
    ]),
  ],
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
  @Input() filter: string | null = null;

  expandState: Record<number, boolean> = {};
  programmableState: Record<
    number,
    { programmable: boolean; parentId?: number; childrenIds?: number[] }
  > = {};

  trackByTitleId = (_: number, item: Inventory) => item.title_id;
  trackBySId = (_: number, item: Season) => item.season_id;
  trackByEPId = (_: number, item: Episode) => item.episode_id;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const { dataSource } = changes;
    if (dataSource.previousValue === null && dataSource.currentValue) {
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

  getProgrammableText(data: Inventory | Season) {
    if ('seasons' in data) {
      if (data.content_type === 'Movie') {
        return 'Single Movie';
      }
      const seasonIds = data.seasons.map((s) => s.season_id);
      if (seasonIds.every((id) => this.programmableState[id].programmable)) {
        return 'All Seasons';
      }
    } else if ('episodes' in data) {
      const episodeIds = data.episodes.map((s) => s.episode_id);
      if (episodeIds.every((id) => this.programmableState[id].programmable)) {
        return 'All Episodes';
      }
    }
    return '';
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
