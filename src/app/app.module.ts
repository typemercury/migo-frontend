import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';
import { InventoryTableHeaderDirective } from './components/inventory-table/inventory-table-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SearchInputComponent,
    InventoryTableComponent,
    InventoryTableHeaderDirective,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
