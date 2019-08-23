import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'myApp-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.scss']
})
export class ExpansionComponent implements OnChanges {
  @Input() forceFold: boolean;
  @Output() forceFoldChange = new EventEmitter();

  expanded = false;

  icon_arrow_down = faAngleDown;
  icon_arrow_right = faAngleRight;

  constructor() { }

  ngOnChanges() {
    if (this.forceFold) {
      this.expanded = false;
    }
  }

  changeExpansion() {
    this.expanded = !this.expanded;
    this.forceFold = false;
    this.forceFoldChange.emit();
  }

}
