import {Component} from '@angular/core';
import {BreadcrumbComponent} from '@app/shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [BreadcrumbComponent],
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  breadcrumbList = [
    {name: 'Home', link: '/'},
    {name: 'Dashboard', link: '/dashboard'},
    {name: 'Analytics'}, // Mục cuối không có link
  ];
}
