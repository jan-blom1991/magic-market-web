import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() size: ButtonSize = 'small';
  @Input() color: ButtonColor = 'primary';
  @Input() shape: ButtonShape;
  @Input() appearance: ButtonAppearance;
  @Input() isDisabled = false;
  @Output() stuff = new EventEmitter();

  determineClass(): string[] {
    return [
      'size' + '-' + this.size,
      'color' + '-' + this.color,
      'shape' + '-' + this.shape,
      'appearance' + '-' + this.appearance
    ];
  }
}

declare type ButtonSize = 'small' | 'large' | undefined;
declare type ButtonColor = 'primary' | 'accent' | 'info' | 'success' | 'error' | undefined;
declare type ButtonShape = 'circle' | 'rectangle' | undefined;
declare type ButtonAppearance = 'filled' | 'stroked' | undefined;
