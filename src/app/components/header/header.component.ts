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
        { label: 'Phim hành động', link: '/category/action' },
        { label: 'Phim tình cảm', link: '/category/romance' },
        { label: 'Phim kinh dị', link: '/category/horror' },
        { label: 'Phim hoạt hình', link: '/category/animation' },
        { label: 'Phim phiêu lưu', link: '/category/adventure' },
        { label: 'Phim hài', link: '/category/comedy' },
        { label: 'Phim khoa học viễn tưởng', link: '/category/science-fiction' },
        { label: 'Phim tài liệu', link: '/category/documentary' },
      ],
    },
    { label: 'Về chúng tôi', link: '/about-us', icon: 'fa-solid fa-users' },
    { label: 'Liên hệ', link: '/contact', icon: 'fa-solid fa-envelope' },
  ];

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
