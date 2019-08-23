import { Component, Input, OnInit } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Component use to display errors'message under fields and buttons
 */
@Component({
  selector: 'myApp-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() message: string;
  @Input() attachType: string;
  public icon_warning = faExclamationCircle;

  errorClass = 'error-field';

  constructor() { }

  ngOnInit() {
    if (this.attachType === 'button') {
      this.errorClass = 'error-button';
    }
  }
}
