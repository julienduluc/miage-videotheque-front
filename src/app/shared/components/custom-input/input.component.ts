import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'myapp-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() label: string;
  @Input() inputMask: string;
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() optional: boolean;
  @Input() placeholder = '';
  @Input() maxlength = '';
  @Input() inputPatterns: any;
  @Input() dialog: boolean;
  @Input() minutesGap: any;
  @Input() height: string;
  @Input() width: string;

  _value = '';

  constructor() { }

  ngOnInit() {
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.propagateChange(this._value);
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  propagateChange = (_: any) => { };
  propagateTouched = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

  touched($event) {
    this.propagateTouched($event);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
