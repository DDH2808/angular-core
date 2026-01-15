import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from 'src/app/services/api/auth.service';
import {BreadcrumbService} from 'src/app/services/common/breadcrumb.service';
import {Subject, takeUntil} from 'rxjs';
import {CommonService} from '@app/services/common/common.service';
import {IUser} from '@app/types/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  breadcrumbList: any = [];
  @Output() clickToggle = new EventEmitter<boolean>(false);
  public user?: IUser;

  private destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private breadcrumbService: BreadcrumbService,
    private readonly commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.listBreadcrumb$.subscribe((data) => {
      this.breadcrumbList = data;
    });
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .pipe()
      .subscribe((data) => {
        if (data) {
          this.user = data;
        }
      });
  }

  toggleBar() {
    this.clickToggle.emit(true);
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }
}
