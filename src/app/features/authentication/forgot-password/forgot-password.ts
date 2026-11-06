import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-card">

      <div class="eyebrow">ACCOUNT RECOVERY</div>
      <div class="auth-symbol"></div>

      <h2>Forgot Password?</h2>

      <p class="auth-description">
        Enter your demo administrator email to continue
        to the reset password form.
      </p>

      <form (ngSubmit)="submit()">

        <div class="field">
          <label for="recoveryEmail">Admin Email</label>

          <input
            id="recoveryEmail"
            name="email"
            type="email"
            [(ngModel)]="email"
            placeholder="Enter admin email"
            required
          />
        </div>

        @if (error) {
          <div class="message error">{{ error }}</div>
        }

        <button class="primary-btn" type="submit">
          Continue
          <span></span>
        </button>
      </form>

      <div class="demo-hint">
        This is a frontend-only recovery preview.
        No recovery email will be sent.
      </div>

      <a class="back-link" routerLink="/auth/login">
         Back to Login
      </a>

    </div>
  `
})
export class ForgotPassword {

  email = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit(): void {
    if (this.auth.requestPasswordReset(this.email)) {
      this.router.navigate(['/auth/reset-password']);
    } else {
      this.error = 'Enter the demo admin email address.';
    }
  }
}
