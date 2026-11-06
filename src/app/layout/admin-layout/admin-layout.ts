import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { WhIcon } from '../../shared/ui/wh-icon';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    WhIcon
  ],
  template: `
    <div class="wh-admin2">

      @if (menuOpen) {
        <button
          class="wh-mobile-overlay"
          aria-label="Close navigation"
          (click)="menuOpen = false"
        ></button>
      }

      <aside class="wh-side" [class.wh-side-open]="menuOpen">

        <div class="wh-side-brand">
          <img
            src="/images/logo/wayhunter-logo.jpg"
            alt="WayHunter Logo"
          />

          <div>
            <strong>WayHunter</strong>
            <small>ADMIN CONTROL CENTER</small>
          </div>
        </div>

        <div class="wh-side-title">MAIN MENU</div>

        <nav class="wh-side-nav">
          @for (item of menu; track item.route) {
            <a
              class="wh-nav-link"
              [routerLink]="item.route"
              routerLinkActive="wh-nav-active"
              (click)="menuOpen = false"
            >
              <wh-icon [name]="item.icon"></wh-icon>
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>

        <div class="wh-side-bottom">

          <div class="wh-admin-user">
            <div class="wh-user-avatar">A</div>

            <div>
              <strong>Administrator</strong>
              <small>Single Admin  Demo</small>
            </div>
          </div>

          <button class="wh-signout" (click)="logout()">
            <wh-icon name="logout"></wh-icon>
            Sign Out
          </button>

        </div>
      </aside>

      <div class="wh-content">

        <header class="wh-top">

          <div class="wh-top-left">

            <button
              class="wh-menu-toggle"
              aria-label="Toggle menu"
              (click)="menuOpen = !menuOpen"
            >
              
            </button>

            <div>
              <small>WAYHUNTER PLATFORM</small>
              <h2>Admin Control Center</h2>
            </div>

          </div>

          <div class="wh-top-right">
            <span class="wh-demo-tag">
              FRONTEND DEMO DATA
            </span>

            <div class="wh-user-avatar">A</div>
          </div>

        </header>

        <main class="wh-view">
          <router-outlet></router-outlet>
        </main>

      </div>
    </div>
  `
})
export class AdminLayout {

  menuOpen = false;

  readonly menu = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Users', icon: 'users', route: '/users' },
    { label: 'Location Verification', icon: 'pin', route: '/location-verification' },
    { label: 'Advertisements', icon: 'ads', route: '/advertisements' },
    { label: 'Places', icon: 'places', route: '/places' },
    { label: 'Trips & Routes', icon: 'trips', route: '/trips-historical-routes' },
    { label: 'Hazards', icon: 'hazard', route: '/hazards' },
    { label: 'Group Trips', icon: 'group', route: '/group-trips' },
    { label: 'Games', icon: 'game', route: '/games' },
    { label: 'Wallet & Rewards', icon: 'wallet', route: '/wallet-rewards' },
    { label: 'Merchants', icon: 'merchant', route: '/merchants' },
    { label: 'Reports', icon: 'reports', route: '/reports-analytics' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
