import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  template: `
    <label class="switch">
      <input
        [ngModel]="checked"
        (ngModelChange)="onChange($event)"
        type="checkbox"
      />
      <span class="slider"></span>
    </label>
  `,
  styleUrls: ['./toggle-switch.component.css'],
})
export class ToggleSwitchComponent {
  @Input() checked = false;
  @Output() switch = new EventEmitter();
  onChange(checked: boolean) {
    this.checked = checked;
    this.switch.emit(checked);
  }
}
