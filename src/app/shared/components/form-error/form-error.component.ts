import { Component, Input, OnInit } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'myApp-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {

  icon_warning = faExclamationCircle;
  @Input() message: any;
  @Input() overlapDisplay = false;

  constructor() { }

  ngOnInit() { }
}
