import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() color: ButtonColor;
  @Input() shape: ButtonShape;
  @Input() appearance: ButtonAppearance;
  @Input() isDisabled = false;
  @Output() stuff = new EventEmitter();

  determineClass(): string[] {
    return [this.shape, this.appearance, this.color];
  }
}

declare type ButtonColor = 'primary' | 'accent' | 'info' | 'success' | 'error' | undefined;
declare type ButtonShape = 'circle' | 'rectangle' | undefined;
declare type ButtonAppearance = 'filled' | 'stroked' | undefined;
