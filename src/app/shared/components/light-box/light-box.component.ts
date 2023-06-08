import {ChangeDetectorRef, Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-light-box',
  templateUrl: './light-box.component.html',
  styleUrls: ['./light-box.component.scss']
})
export class LightBoxComponent implements OnInit {
  private _active: boolean = false;

  get active(): boolean {
    return this._active;
  }

  @Input() set active(value: boolean) {
    this._active = value;
  }

  @Input() disableCross: boolean | string = false;

  @HostBinding('class') get class(): string {
    return 'active-' + this._active;
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.changeDetector.detectChanges();
  }
}
