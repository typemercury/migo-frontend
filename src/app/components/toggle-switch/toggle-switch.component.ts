import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
export class ToggleSwitchComponent implements OnChanges {
  @Input() checked = false;
  @Output() switch = new EventEmitter();
  onChange(checked: boolean) {
    console.log(
      '%c 🍏 onChange: ',
      'font-size:20px;background-color: #33A5FF;color:#fff;',
      checked
    );
    this.checked = checked;
    this.switch.emit(checked);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(
      '%c 🥒 e: ',
      'font-size:20px;background-color: #3F7CFF;color:#fff;',
      changes
    );
  }
}
