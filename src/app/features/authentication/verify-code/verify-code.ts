import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-card">

      <div class="eyebrow">SECURITY VERIFICATION</div>
      <div class="auth-symbol"></div>

      <h2>Verify Your Access</h2>

      <p class="auth-description">
        Enter the 6-digit demo verification code
        to access your Admin Dashboard.
      </p>

      <form (ngSubmit)="submit()">

        <div class="field">
          <label for="otp">Verification Code</label>

          <input
            id="otp"
            class="otp-input"
            name="otp"
            type="text"
            inputmode="numeric"
            maxlength="6"
            [(ngModel)]="otp"
            placeholder=""
            autocomplete="one-time-code"
            required
          />
        </div>

        @if (error) {
          <div class="message error">{{ error }}</div>
        }

        <button class="primary-btn" type="submit">
          Verify & Continue
          <span></span>
        </button>
      </form>

      <div class="demo-hint">
        <strong>Demo OTP: 123456</strong>
        <div>No real email or SMS is sent.</div>
      </div>

      <a class="back-link" routerLink="/auth/login">
         Back to Login
      </a>

    </div>
  `
})
export class VerifyCode {

  otp = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit(): void {
    this.error = '';

    if (this.auth.verifyOtp(this.otp)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid code or login session. Try again.';
    }
  }
}
