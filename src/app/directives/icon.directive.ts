import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'img[appIcon]',
})
export class IconDirective {
  @HostBinding('src') get src() {
    return `assets/icons/${this.appIcon}.svg`;
  }
  @Input() appIcon: string = '';
  constructor() {}
}
