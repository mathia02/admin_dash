import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-card">

      <div class="eyebrow">ACCOUNT RECOVERY</div>
      <div class="auth-symbol"></div>

      <h2>Create New Password</h2>

      <p class="auth-description">
        Set a new demo password for this browser session.
      </p>

      <form (ngSubmit)="submit()">

        <div class="field">
          <label for="newPassword">New Password</label>

          <input
            id="newPassword"
            type="password"
            name="newPassword"
            [(ngModel)]="password"
            placeholder="Minimum 8 characters"
            minlength="8"
            required
          />
        </div>

        <div class="field">
          <label for="confirmPassword">Confirm Password</label>

          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            [(ngModel)]="confirmPassword"
            placeholder="Re-enter password"
            required
          />
        </div>

        @if (error) {
          <div class="message error">{{ error }}</div>
        }

        @if (success) {
          <div class="message success">{{ success }}</div>
        }

        <button class="primary-btn" type="submit">
          Reset Demo Password
          <span></span>
        </button>
      </form>

      <div class="demo-hint">
        Demo only. This does not change a real
        administrator password.
      </div>

      <a class="back-link" routerLink="/auth/login">
         Return to Login
      </a>
    </div>
  `
})
export class ResetPassword {

  password = '';
  confirmPassword = '';
  error = '';
  success = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit(): void {
    this.error = '';
    this.success = '';

    if (this.password.length < 8) {
      this.error = 'Password must contain at least 8 characters.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    if (!this.auth.resetPassword(this.password)) {
      this.error = 'Start from Forgot Password first.';
      return;
    }

    this.success = 'Demo password updated for this browser session.';

    this.router.navigate(['/auth/login']);
  }
}
