import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  template: `<div class="relative w-full h-full">
    <img [appIcon]="'search'" class="absolute top-[11px] left-[20px]" />
    <input
      class="w-[calc(100%-56px)] h-full absolute left-[56px] "
      placeholder="Search for titles in inventory"
      [ngModel]="value"
      (ngModelChange)="onNgModelChange($event)"
      (input)="onInput($event)"
    />
  </div>`,
  styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent implements OnInit {
  @Output() input = new EventEmitter();
  value = '';
  constructor() {}

  ngOnInit(): void {}

  onNgModelChange(value: string) {
    this.value = value;
    this.input.emit(value);
  }

  onInput(e: Event) {
    e.stopPropagation();
  }
}
