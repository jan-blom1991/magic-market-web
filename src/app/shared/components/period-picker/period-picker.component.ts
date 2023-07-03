import {Component, HostBinding, HostListener} from '@angular/core';
import {ColorType} from "../../models/types";

@Component({
  selector: 'app-period-picker',
  templateUrl: './period-picker.component.html',
  styleUrls: ['./period-picker.component.scss']
})
export class PeriodPickerComponent {
  private _currentYear: number = new Date().getFullYear();
  private _currentMonth: number = new Date().getMonth();

  public selectedYear: number = this._currentYear;
  public selectedMonth: number = this._currentMonth - 1;
  public mode: PickerModeType = 'year';
  public color: ColorType = 'primary';
  public active: boolean = false;

  private _years: number[] = Array.from(
    {length: 120}, (_, i) => (this._currentYear - 71) + i++
  );
  private _months: Map<number, string> = new Map([
    [1, 'jan'], [2, 'feb'], [3, 'mar'], [4, 'apr'],
    [5, 'may'], [6, 'jun'], [7, 'jul'], [8, 'aug'],
    [9, 'sep'], [10, 'okt'], [11, 'nov'], [12, 'dec']
    ]);

  get years(): number[] {
    return this._years.slice((this.selectedYear - (this._currentYear - 65)) -5, (this.selectedYear - (this._currentYear - 65)) + 7);
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

  @HostListener('click', ['$event'])
  clickInside($event) {
    $event.stopPropagation();
  }

  @HostListener('document:click')
  clickOutside() {
    this.active = false;
    this.mode = 'year';
  }

  getPeriod(): string {
    const period = this.selectedMonth + '/' + this.selectedYear;
    const regExp = new RegExp('\\b[1-9]\\b');
    return regExp.test(this.selectedMonth.toString()) ? '0' + period : period;
  }

  getYear(step: number): void {
    if (this.mode === 'year') {
      step = step * 12;
    }
    const newYear = this._years.find(year => year === this.selectedYear + step);
    if (newYear) {
      this.selectedYear = newYear;
    }
    console.log(this._years);
  }

  switchMode() {
    this.mode = this.mode === 'year' ? 'month' : 'year';
  }
}

declare type PickerModeType = 'month' | 'year';
