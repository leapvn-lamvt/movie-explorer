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
    { label: 'Trang chủ', link: '/', icon: 'fa-solid fa-house' },
    {
      label: 'Thể loại',
      dropdown: true,
      subItems: [
        { label: 'Phim hành động', link: '/the-loai/hanh-dong' },
        { label: 'Phim tình cảm', link: '/the-loai/tinh-cam' },
        { label: 'Phim kinh dị', link: '/the-loai/kinh-di' },
        { label: 'Phim hoạt hình', link: '/the-loai/hoat-hinh' },
        { label: 'Phim phiêu lưu', link: '/the-loai/phieu-luu' },
        { label: 'Phim hài', link: '/the-loai/hai' },
        { label: 'Phim khoa học viễn tưởng', link: '/the-loai/khoa-hoc-vien-tuong' },
        { label: 'Phim tài liệu', link: '/the-loai/tai-lieu' },
      ],
    },
    { label: 'Về chúng tôi', link: '/ve-chung-toi', icon: 'fa-solid fa-users' },
    { label: 'Liên hệ', link: '/lien-he', icon: 'fa-solid fa-envelope' },
  ];

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
