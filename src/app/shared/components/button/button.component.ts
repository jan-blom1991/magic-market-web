import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() size: ButtonSize = 'medium';
  @Input() color: ButtonColor = 'primary';
  @Input() shape: ButtonShape;
  @Input() appearance: ButtonAppearance;
  @Input() icon: string;
  @Input() isDisabled = false;
  @Output() action = new EventEmitter();

  determineClass(): string[] {
    return [
      'size' + '-' + this.size,
      'color' + '-' + this.color,
      'shape' + '-' + this.shape,
      'appearance' + '-' + this.appearance
    ];
  }
}

declare type ButtonSize = 'tiny' | 'small' | 'medium' | 'large' | undefined;
export type ButtonColor = 'primary' | 'accent' | 'info' | 'success' | 'error' | undefined;
declare type ButtonShape = 'circle' | 'rectangle' | undefined;
declare type ButtonAppearance = 'filled' | 'stroked' | undefined;
