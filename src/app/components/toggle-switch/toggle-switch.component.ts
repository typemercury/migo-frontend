import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

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
  @HostListener('click', ['$event']) onClick(e: Event) {
    e.stopPropagation();
  }
  onChange(checked: boolean) {
    this.checked = checked;
    this.switch.emit(checked);
  }
}
