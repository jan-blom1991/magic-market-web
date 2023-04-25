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
      multi:true,
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

  value: string;
  onChange = (value) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;
  valid: boolean;

  ngOnInit(): void {
    this.required = this.required != undefined
    this.hasPrefix = this.hasPrefix != undefined
    this.noLabel = this.noLabel != undefined
    this.readOnly = this.readOnly != undefined
  }

  registerOnChange(onChange: any): void {
    this.onChange(onChange);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched()
  }

  writeValue(value: any): void {
    this.value = value;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
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
