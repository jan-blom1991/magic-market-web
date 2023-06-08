import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() label: string;
  @Input() readOnly: boolean;
  @Input() required: boolean | string;
  @Input() hasPrefix: boolean;
  @Input() options: any[];

  private _value: boolean | string | number = null;

  public get value(): boolean | string | number {
    return this._value;
  }

  setValue(option: any) {
    console.log(option);
    this._value = option;
  }

  determineSize(): number {
    if (!this.options) {
      return 50;
    }

    const option = this.options
      .map(option => option.toString())
      .reduce((a, b) => {
        return a.length > b.length ? a : b;
      });

    return option.length > this.label.length ? option.length : this.label.length;
  }
}
