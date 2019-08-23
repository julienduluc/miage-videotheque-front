import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'myApp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnChanges {

  @Input() buttonType: string;
  @Input() disabled: any;
  @Input() color: string;
  @Input() sizeFixed = true;
  @Output() action = new EventEmitter();
  @ViewChild('btn', { static: true }) btn: ElementRef;

  class: string;
  btn_color: string;

  constructor() { }

  ngOnInit() {
    this.btn_color = 'color-' + this.color;

    if (!this.sizeFixed) {
      this.class = 'myApp-button-size-not-fixed';
    }
  }

  ngOnChanges() {
    this.btn_color = 'color-' + this.color;
  }

  onClick() {
    this.action.emit();
    this.btn.nativeElement.blur();
  }
}
