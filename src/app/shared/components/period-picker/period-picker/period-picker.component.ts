import {Component, HostBinding, HostListener} from '@angular/core';
import {ColorType} from "../../../models/types";

@Component({
  selector: 'app-period-picker',
  templateUrl: './period-picker.component.html',
  styleUrls: ['./period-picker.component.scss']
})
export class PeriodPickerComponent {
  private _years: number[] = Array.from({length: 100}, (_, i) => 1950 + i++);
  private _months: Map<number, string> = new Map([
    [1, 'jan'], [2, 'feb'], [3, 'mar'], [4, 'apr'],
    [5, 'may'], [6, 'jun'], [7, 'jul'], [8, 'aug'],
    [9, 'sep'], [10, 'okt'], [11, 'nov'], [12, 'dec']
    ]);

  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  color: ColorType = 'primary';
  active: boolean = true;
  mode: PickerModeType = 'year';

  get years(): number[] {
    return this._years.slice((this.currentYear - 1950) -5, (this.currentYear - 1950) + 7);
  }

  get months(): Map<number, string> {
    return this._months;
  }

  @HostBinding('class') get class(): string[] {
    return [
      'active' + '-' + this.active,
      'color' + '-' + this.color,
    ];
  }

  @HostListener('document:click')
  clickOutside() {
    this.active = !this.active;
  }

  getPeriod(): string {
    const period = this.currentMonth + '/' + this.currentYear;
    const regExp = new RegExp('\\b[1-9]\\b');
    return regExp.test(this.currentMonth.toString()) ? '0' + period : period;
  }

  getYear(step: number): void {
    this.currentYear = this._years.find(year => year === this.currentYear + step);
  }

  switchMode() {
    this.mode = this.mode === 'year' ? 'month' : 'year';
  }
}

declare type PickerModeType = 'month' | 'year';
