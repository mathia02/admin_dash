import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-card wh-login-card">

      <div class="eyebrow">ADMIN AUTHENTICATION</div>

      <h2>Welcome Back</h2>

      <p class="auth-description">
        Sign in to manage your WayHunter platform.
      </p>

      <form (ngSubmit)="submit()">

        <div class="field">
          <label for="adminEmail">Admin Email Address</label>

          <div class="wh-input-wrap">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14"
                    rx="2" fill="none"
                    stroke="currentColor" stroke-width="1.7"/>
              <path d="m4 7 8 6 8-6"
                    fill="none" stroke="currentColor"
                    stroke-width="1.7"/>
            </svg>

            <input
              id="adminEmail"
              name="email"
              type="email"
              autocomplete="username"
              [(ngModel)]="email"
              placeholder="Enter admin email"
              required
            />
          </div>
        </div>

        <div class="field">

          <div class="field-heading">
            <label for="adminPassword">Password</label>

            <a routerLink="/auth/forgot-password">
              Forgot Password?
            </a>
          </div>

          <div class="wh-input-wrap">

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="10" width="14" height="11"
                    rx="2" fill="none"
                    stroke="currentColor" stroke-width="1.7"/>
              <path d="M8 10V7a4 4 0 0 1 8 0v3"
                    fill="none" stroke="currentColor"
                    stroke-width="1.7"/>
            </svg>

            <input
              id="adminPassword"
              name="password"
              [type]="showPassword ? 'text' : 'password'"
              [(ngModel)]="password"
              placeholder="Enter password"
              autocomplete="current-password"
              required
            />

            <button
              class="wh-eye-btn"
              type="button"
              [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
              (click)="showPassword = !showPassword"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"/>
                <circle cx="12" cy="12" r="3"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.7"/>
              </svg>
            </button>
          </div>
        </div>

        @if (error) {
          <div class="message error" role="alert">
            {{ error }}
          </div>
        }

        <button class="primary-btn" type="submit">
          <span>Sign In</span>
          <span aria-hidden="true"></span>
        </button>

      </form>
    </div>
  `
})
export class Login {

  email = '';
  password = '';
  showPassword = false;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit(): void {
    this.error = '';

    if (!this.email.trim() || !this.password) {
      this.error = 'Please enter email and password.';
      return;
    }

    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/auth/verify-code']);
    } else {
      this.error = 'Invalid admin demo credentials.';
    }
  }
}
