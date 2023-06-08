import {Component, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputComponent
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() type: InputType;
  @Input() name: string;
  @Input() required: string | boolean;
  @Input() hasPrefix: string | boolean;
  @Input() noLabel: string | boolean;
  @Input() readOnly: string | boolean;
  @Input() value: string;

  disabled = false;
  valid: boolean;
  onChange = (_: any) => { };
  onTouched = () => { };

  // constructor(@Self() @Optional() public control: NgControl) {
  //   this.control && (this.control.valueAccessor = this);
  // }

  ngOnInit(): void {
    this.required = this.required != undefined
    this.hasPrefix = this.hasPrefix != undefined
    this.noLabel = this.noLabel != undefined
    this.readOnly = this.readOnly != undefined
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.onChange(value);
    this.onTouched();
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.valid = true;
    return null;
  }
}

declare type InputType = 'text' | 'checkbox' | 'file' | 'password' | undefined;
