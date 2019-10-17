import { Component, Input, OnInit } from '@angular/core';

/**
 * Component use to display errors'message under fields and buttons
 */
@Component({
  selector: 'myapp-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() message: string;
  @Input() attachType: string;

  errorClass = 'error-field';

  constructor() { }

  ngOnInit() {
    if (this.attachType === 'button') {
      this.errorClass = 'error-button';
    }
  }
}
