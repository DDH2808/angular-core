import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {AuthService} from 'src/app/services/api/auth.service';
import {ISidebar, ESiteModule} from '@app/types/viewmodels';
import {NavigationEnd, Router} from '@angular/router';
import {IUser} from '@app/types/auth';
import {Subject, takeUntil} from 'rxjs';
import {IModalConfirmContent} from '@share/custom/modal-confirm/modal-confirm.component';
import {ModalConfirmService} from '@share/custom/modal-confirm/modal-confirm.service';
import {Title} from '@angular/platform-browser';
import {ERole} from '@app/services/api/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('sidebar') sidebar!: ElementRef;
  public isOpen = false;
  public user?: IUser;

  // Default sidebar for admin role
  public sidebars: ISidebar[] = [
    {
      link: `/${ESiteModule.ACCOUNT_MANAGEMENT}`,
      name: 'Danh sách cán bộ',
      icon: './assets/images/sidebar/user-management.svg',
      iconActive: './assets/images/sidebar/user-management-active.svg',
      isActive: false,
      disabled: false,
      children: [
        {
          link: `/${ESiteModule.ACCOUNT_MANAGEMENT}/${ESiteModule.STAFF_CENTER}`,
          name: 'Nhân viên trung tâm',
          isActive: false,
          disabled: false,
        },
        {
          link: `/${ESiteModule.ACCOUNT_MANAGEMENT}/${ESiteModule.ADMIN_STATION}`,
          name: 'Admin trạm',
          isActive: false,
          disabled: false,
        },
      ],
    },
    {
      link: `/${ESiteModule.MANAGEMENT}`,
      name: 'Quản lý',
      icon: './assets/images/sidebar/user-management.svg',
      iconActive: './assets/images/sidebar/user-management-active.svg',
      isActive: false,
      disabled: false,
      children: [
        {
          link: `/${ESiteModule.MANAGEMENT}/${ESiteModule.STATION_MANAGEMENT}`,
          name: 'Quản lý trạm',
          isActive: false,
          disabled: false,
        },
        {
          link: `/${ESiteModule.MANAGEMENT}/${ESiteModule.GROUP_MANAGEMENT}`,
          name: 'Quản lý nhóm',
          isActive: false,
          disabled: false,
        },
        {
          link: `/${ESiteModule.MANAGEMENT}/${ESiteModule.REGISTERED_PASSENGER_MANAGEMENT}`,
          name: 'Quản lý hành khách đăng ký',
          isActive: false,
          disabled: false,
        },
        {
          link: `/${ESiteModule.MANAGEMENT}/${ESiteModule.IO_CATEGORY_MANAGEMENT}`,
          name: 'Quản lý danh mục xuất nhập cảnh',
          isActive: false,
          disabled: false,
        },
      ],
    },
    {
      link: `/${ESiteModule.SUPERVISE_SYSTEM_STATUS}`,
      name: 'Giám sát trạng thái hệ thống',
      icon: './assets/images/sidebar/user-management.svg',
      iconActive: './assets/images/sidebar/user-management-active.svg',
      isActive: false,
      disabled: false,
    },
    {
      link: `/${ESiteModule.SUPERVISE_SYNC_STATION}`,
      name: 'Giám sát đồng bộ trạm',
      icon: './assets/images/sidebar/user-management.svg',
      iconActive: './assets/images/sidebar/user-management-active.svg',
      isActive: false,
      disabled: false,
    },
  ];

  // Sidebar for SuperAdmin role
  public sidebarWithSuperAdmin: ISidebar[] = [
    {
      link: `/${ESiteModule.SETTINGS}`,
      name: 'Cài đặt',
      icon: './assets/images/sidebar/user-management.svg',
      iconActive: './assets/images/sidebar/user-management-active.svg',
      isActive: false,
      disabled: false,
    },
    {
      link: `/${ESiteModule.HISTORY_STAFF}`,
      name: 'Lịch sử cán bộ',
      icon: './assets/images/sidebar/user-management.svg',
      iconActive: './assets/images/sidebar/user-management-active.svg',
      isActive: false,
      disabled: false,
    },
  ];

  get currentSidebars(): ISidebar[] {
    return this.user && this.user.role && this.user.role === ERole.SuperAdmin
      ? this.sidebarWithSuperAdmin
      : this.sidebars;
  }

  private destroy$ = new Subject();

  constructor(
    private readonly modalConfirmService: ModalConfirmService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private titleService: Title,
  ) {}

  ngOnInit() {
    if (window?.innerWidth > 768) {
      this.isOpen = true;
    }
    this.changeRoute();
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.user = data;
        }
      });
    this.authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (!data) {
          this.router.navigate(['/auth']);
        }
      });
  }

  // Rest of the methods remain the same as in the original code
  changeRoute() {
    this.activeSidebar(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeSidebar(event.url);
      }
    });
  }

  activeSidebar(url: string) {
    url = url.replace(/\?.*/, '');
    const urlOne = `/${url.split('/')?.[1]}`;

    // Use the current sidebars based on user role
    const sidebarsToUpdate = this.currentSidebars;

    sidebarsToUpdate.map((side: any) => {
      if (side.link === urlOne) {
        if (side.children) {
          side.children.map((child: ISidebar) => {
            child.isActive = url.includes(child.link);
            if (child.isActive) {
              this.titleService.setTitle(side.name + ' - ' + child.name);
            }
            return child;
          });
        } else {
          this.titleService.setTitle(side.name);
        }
        side.isActive = true;
      } else {
        if (side.children) {
          side.children.map((child: {isActive: boolean; link: string}) => {
            child.isActive = false;
            return child;
          });
        }
        side.isActive = false;
      }
      return side;
    });
  }

  toggleBar() {
    this.sidebar.nativeElement.classList.toggle('open');
    this.isOpen = !this.isOpen;
  }

  toggleSubmenu(index: number) {
    const submenuElements = document.querySelector('.sub-menu-' + index);
    const iconElements = document.querySelector('.icon-' + index);
    if (submenuElements) submenuElements.classList.toggle('d-none');
    if (iconElements) {
      iconElements.classList.toggle('fa-caret-up');
      iconElements.classList.toggle('fa-caret-down');
    }
  }

  onClickNav($event: {preventDefault: () => void}) {
    $event.preventDefault();
    if (this.isOpen && window?.innerWidth < 768) {
      this.isOpen = true;
      this.toggleBar();
    }
  }

  handleLogout() {
    const title = 'Xác nhận đăng xuất?';
    const description = 'Bạn sẽ quay lại màn hình đăng nhập';
    const okText = 'Đồng ý';
    const modalContent: IModalConfirmContent = {
      title,
      description,
      okText,
      type: 'info',
      modalType: 'advance',
    };

    this.modalConfirmService.openModal(modalContent, undefined, () => {
      this.authService.logout();
    });
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
