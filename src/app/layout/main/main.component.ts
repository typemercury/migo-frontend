import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Inventory } from 'src/app/services/inventory-data';
import { InventoryDataService } from 'src/app/services/inventory-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  _dataSource$ = new Subject<Inventory[]>();
  dataSource$ = this._dataSource$.asObservable();
  private _data: Inventory[] = [];

  filter$ = new Subject<string>();

  constructor(private inventoryDataService: InventoryDataService) {
    this.inventoryDataService.getData().subscribe((data) => {
      this._data = data;
      this._dataSource$.next(data);
    });
    this.filter$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((filter) => {
        this.applyFilter(filter);
      });
  }

  ngOnInit(): void {}

  applyFilter(filter: string) {
    if (!filter) {
      this._dataSource$.next(this._data);
      return;
    }
    const map: Record<number, boolean> = {};
    filter = filter.trim().toLowerCase();
    this._data.forEach((t) => {
      if (t.title_name.toLowerCase().includes(filter)) {
        map[t.title_id] = true;
      }
      t.seasons.forEach((s) => {
        if (s.season_name.toLowerCase().includes(filter)) {
          map[t.title_id] = true;
          map[s.season_id] = true;
        }
        s.episodes.forEach((ep) => {
          if (ep.episode_name.toLowerCase().includes(filter)) {
            map[t.title_id] = true;
            map[s.season_id] = true;
            map[ep.episode_id] = true;
          }
        });
      });
    });

    let result = this._data
      .filter((t) => map[t.title_id])
      .map((t) => ({ ...t }));
    result.forEach((t) => {
      t.seasons = t.seasons
        .filter((s) => map[s.season_id])
        .map((s) => ({ ...s }));
      t.seasons.forEach((s) => {
        s.episodes = s.episodes
          .filter((ep) => map[ep.episode_id])
          .map((ep) => ({ ...ep }));
      });
    });

    this._dataSource$.next(result);
  }
}
