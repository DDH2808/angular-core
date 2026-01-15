import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '@app/services/api/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit {
  public loading = true;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    } else {
      this.loading = false;
      // TODO landing page
    }
  }
}
