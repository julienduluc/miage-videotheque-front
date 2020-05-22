import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { MessagesService } from '@core/messages/messages.service';
import { AccountService } from '@shared/services/account.service';
import { FilmsService } from '@shared/services/films.service';
import { ReviewService } from '@shared/services/review.service';
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
  @Output() newReview = new EventEmitter<any>();
  isAuthenticated: boolean;

  constructor(
    private fb: FormBuilder,
    private filmService: FilmsService,
    private reviewService: ReviewService,
    private msgService: MessagesService,
    private accountService: AccountService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      review: [null, [Validators.required]]
    });

    this.isAuthenticated = this.authService.isAuthenticated;
  }

  async onSubmit() {

    if (this.form.valid) {
      const userConnected = await this.accountService.getAccountDetails().toPromise();
      const data = {
        review: this.form.get('review').value,
        id_film: this.idFilm,
        id_user: userConnected.id,
        username: userConnected.username
      };

      this.reviewService.addReview(data).subscribe(() => {
        this.form.reset();
        this.form.get('review').setErrors(null);
        this.newReview.emit(true);
        this.msgService.showSuccess('Revue ajoutée');
      });
    }

  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
