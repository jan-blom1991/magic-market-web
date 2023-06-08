import {Component, HostBinding, OnInit} from '@angular/core';
import {ProgressBarService} from "../../../services/progress-bar.service";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  private _active: boolean = false;
  private _color: ProgressBarColor;

  @HostBinding('class') get classes(): string {
    return 'active-' + this._active + ' ' + 'color-' + this._color;
  }

  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.progressBarService.color$.subscribe(value => this._color = value);
    this.progressBarService.active$.subscribe(value => this._active = value);
  }
}

export declare type ProgressBarColor = 'primary' | 'accent' | 'info' | 'success' | 'error';
