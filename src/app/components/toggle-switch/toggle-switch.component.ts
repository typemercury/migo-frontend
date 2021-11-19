import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  template: `
    <label class="switch">
      <input [(ngModel)]="checked" type="checkbox" />
      <span class="slider"></span>
    </label>
  `,
  styleUrls: ['./toggle-switch.component.css'],
})
export class ToggleSwitchComponent {
  @Input() checked = false;
}
