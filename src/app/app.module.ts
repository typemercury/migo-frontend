import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';
import { InventoryTableHeaderDirective } from './components/inventory-table/inventory-table-header.directive';
import { IconDirective } from './directives/icon.directive';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SearchInputComponent,
    InventoryTableComponent,
    InventoryTableHeaderDirective,
    IconDirective,
    ToggleSwitchComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
