import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { merge, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[formError]'
})
export class FormErrorDirective implements OnInit, OnChanges, OnDestroy {
  @Input() formError: string;
  control: AbstractControl;
  hasView = false;
  controlValue$: Observable<any>;
  controlSubscription: Subscription;
  hasSubmitted: boolean;
  constructor(
    private _fg: ControlContainer,
    private _el: ElementRef,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
    this.mainWork();
  }

  ngOnChanges() {
    this.mainWork();
  }

  mainWork() {
    this.control = this.form.get(this.formError);
    const formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit.pipe(map(() => {
      this.hasSubmitted = true;
    }));
    this.controlValue$ = merge(this.control.valueChanges, of(''), formSubmit$);
    this.controlSubscription = this.controlValue$.subscribe(() => {
      this.setVisible();
    });
  }

  private setVisible() {
    if (this.hasSubmitted && this.control.invalid) {
      // this.render.removeStyle(this._el.nativeElement, 'color');
      // this.render.setStyle(this._el.nativeElement, 'border', 'red');
      this._renderer.addClass(this._el.nativeElement, 'input-error');
    } else {
      // this.render.setStyle(this._el.nativeElement, 'color', 'green');
      this._renderer.removeClass(this._el.nativeElement, 'input-error');
    }
  }

  match(error: string) {
    if (this.control && this.control.errors) {
      if (Object.keys(this.control.errors).indexOf(error) > -1) {
        return true;
      }
    }
    return false;
  }

  get form() { return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null; }

  ngOnDestroy() {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }
}
