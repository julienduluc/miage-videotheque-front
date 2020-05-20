import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilmsService } from '@shared/services/films.service';
import { ReviewService } from '@shared/services/review.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';

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
    private filmService: FilmsService,
    private reviewService: ReviewService,
    private localStorage: SessionStorageService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      review: [null, [Validators.required, Validators.minLength(100)]],
      // idUser: [11],
      // idFilm: [this.idFilm]
    });
  }

  onSubmit() {
    const data = {
      review: this.form.get('review').value,
      id_film: this.idFilm,
      id_user: this.localStorage.retrieve('sessionid')
    };

    this.reviewService.addReview(data).subscribe();
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
