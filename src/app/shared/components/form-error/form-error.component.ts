import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'myapp-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {

  @Input() message: any;
  @Input() overlapDisplay = false;

  constructor() { }

  ngOnInit() { }
}
