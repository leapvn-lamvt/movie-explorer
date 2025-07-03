import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  navItems = [
    { label: 'Trang chủ', link: '/' },
    { label: 'Về chúng tôi', link: '/about-us' },
    { label: 'Liên hệ', link: '/contact' },
  ];
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
