import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {CommonService} from '@app/services/common/common.service';
import {SidebarComponent} from '@share/layout/sidebar/sidebar.component';
import {Router} from '@angular/router';
import {AuthService} from '@app/services/api/auth.service';
import {IUser} from '@app/types/auth';
import {UserService} from '@app/services/api/user.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {EBroadcastWebMessage} from '@app/types/constant';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  @Output() isToggle = new EventEmitter<boolean>();
  @ViewChild(SidebarComponent)
  sidebarComponent?: SidebarComponent;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly modalService: BsModalService,
  ) {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.onAuthorizationResultComplete(user);
        }
      });
  }

  private onAuthorizationResultComplete(user: IUser) {
    if (user) {
      this.authService.broadcastChannel.onmessage = (event: any) => {
        if (event.data === EBroadcastWebMessage.NEW_LOGIN) {
          window.location.reload();
        }
      };
    }
  }

  handleToggle() {
    this.sidebarComponent?.toggleBar();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
