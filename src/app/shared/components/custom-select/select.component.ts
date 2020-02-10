import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { SelectDialogComponent } from './dialog/select-dialog.component';

@Component({
  selector: 'myapp-select',
  templateUrl: 'select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() label: string;
  @Input() labelVar: string;
  @Input() entries: Array<any>;
  @Input() disabled = false;
  @Input() optional = false;
  @Input() width: string;

  @Output() changeValue = new EventEmitter();

  _value = '';

  text: string;

  // @ViewChild('myDiv', null) divView: ElementRef;

  constructor(
    private dialog: MatDialog,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.selectValueById();
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this.value = value;
      this.selectValueById();
    }
  }

  propagateChange = (_: any) => {
  }
  propagateTouched = (_: any) => {
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

  touched($event) {
    this.propagateTouched($event);
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.propagateChange(this._value);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    if (isDisabled) {
      // this._renderer.addClass(this.divView.nativeElement, 'disabled');
    } else {
      // this._renderer.removeClass(this.divView.nativeElement, 'disabled');
    }
  }

  selectValueById() {
    if (this.value && this.entries) {
      for (let i = 0; i < this.entries.length; i++) {
        const elt = this.entries[i];
        if (elt && +elt.id === +this.value) {
          this.text = elt[this.labelVar];
          break;
        } else if (elt === this.value) {
          this.text = this.value;
          break;
        } else {
          this.text = '';
        }
      }
    }
  }

  onClickSelect() {
    const dialogRef = this.dialog.open(SelectDialogComponent, {
      disableClose: false,
      panelClass: 'select-dialog',
      data: {
        entries: this.entries,
        labelVar: this.labelVar,
        optional: this.optional
      }
    });

    dialogRef.afterClosed().subscribe(entry => {
      if (entry) {
        if (this.labelVar) {
          this.value = entry.id;
        } else {
          this.value = entry;
        }
      } else if (entry === '') {
        this.value = null;
      }

      this.touched(null);
      this.selectValueById();
      this.changeValue.emit();
    });
  }
}
