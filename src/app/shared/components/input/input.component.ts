import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() type: InputType;
  @Input() label: string;
  @Input() readOnly: boolean;
  @Input() required: boolean | string;
  @Input() hasPrefix: boolean;

  public valid: boolean;
}

declare type InputType = 'text' | 'checkbox' | 'file' | 'password' | undefined;
