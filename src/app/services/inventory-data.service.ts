import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from './inventory-data';

@Injectable({
  providedIn: 'root',
})
export class InventoryDataService {
  constructor(private http: HttpClient) {}
  getData(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>('assets/data/data.json');
  }
}
