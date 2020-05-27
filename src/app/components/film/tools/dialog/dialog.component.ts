import { Component, OnInit, Inject } from '@angular/core';
import { FilmsService } from '@shared/services/films.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'myapp-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: [ './dialog.component.scss' ]
})
export class DialogComponent implements OnInit {
	constructor(private film_service: FilmsService, @Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit(): void {}

	onChange(value): void {
		this.film_service.AddRate(this.data.id, parseInt(value));
		setTimeout(function() {
			window.location.reload();
		}, 1000);
	}
}
