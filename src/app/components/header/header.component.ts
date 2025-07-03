import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navItems = [
    { label: 'Trang chủ', link: '/' },
    {
      label: 'Thể loại',
      dropdown: true,
      subItems: [
        { label: 'Hành động', link: '/the-loai/hanh-dong' },
        { label: 'Tình cảm', link: '/the-loai/tinh-cam' },
        { label: 'Kinh dị', link: '/the-loai/kinh-di' },
      ],
    },
    { label: 'Về chúng tôi', link: '/ve-chung-toi' },
    { label: 'Liên hệ', link: '/lien-he' },
  ];

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
