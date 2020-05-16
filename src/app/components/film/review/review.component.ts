import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FilmsService } from '@shared/services/films.service';

@Component({
    selector: 'myapp-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {

    private unsubscribe$ = new Subject();
    form: FormGroup;
    @Input() idFilm: number;
    idUser: number;

    constructor(
        private fb: FormBuilder,
        private filmService: FilmsService
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            review: [null, [Validators.required, Validators.minLength(100)]],
            //idUser: [11],
            //idFilm: [this.idFilm]
        });
    }

    onSubmit() {

        const data = {
            review: this.form.get('review').value,
            id_film: this.idFilm,
            id_user: 11
        }

        this.filmService.addReview(data).subscribe();
    }


    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
