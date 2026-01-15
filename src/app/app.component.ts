import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslocoService} from '@jsverse/transloco';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  public loading = {
    user: false,
  };

  constructor(private readonly translate: TranslocoService) {}

  ngOnInit(): void {
    const lang = window.localStorage.getItem('language');
    if (lang) {
      this.translate.setActiveLang(lang);
    } else {
      window.localStorage.setItem('language', 'vi');
    }
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
