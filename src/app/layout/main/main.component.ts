import { Component, OnInit } from '@angular/core';
import { InventoryDataService } from 'src/app/services/inventory-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private inventoryDataService: InventoryDataService) {
    this.inventoryDataService.getData().subscribe((data) => {
      console.log(
        '%c 🥞 data: ',
        'font-size:20px;background-color: #B03734;color:#fff;',
        data
      );
    });
  }

  ngOnInit(): void {}
}
