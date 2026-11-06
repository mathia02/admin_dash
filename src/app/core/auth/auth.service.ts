import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly ADMIN_EMAIL = 'admin@wayhunter.lk';
  private readonly DEFAULT_PASSWORD = 'Admin@123';
  private readonly DEMO_OTP = '123456';

  readonly isLoggedIn = signal(
    sessionStorage.getItem('wh_logged_in') === 'true'
  );

  login(email: string, password: string): boolean {
    const savedPassword =
      sessionStorage.getItem('wh_demo_password') || this.DEFAULT_PASSWORD;

    const valid =
      email.trim().toLowerCase() === this.ADMIN_EMAIL &&
      password === savedPassword;

    if (valid) {
      sessionStorage.setItem('wh_pending_login', 'true');
    }

    return valid;
  }

  verifyOtp(otp: string): boolean {
    if (
      sessionStorage.getItem('wh_pending_login') !== 'true' ||
      otp.trim() !== this.DEMO_OTP
    ) {
      return false;
    }

    sessionStorage.removeItem('wh_pending_login');
    sessionStorage.setItem('wh_logged_in', 'true');
    this.isLoggedIn.set(true);

    return true;
  }

  requestPasswordReset(email: string): boolean {
    if (email.trim().toLowerCase() !== this.ADMIN_EMAIL) {
      return false;
    }

    sessionStorage.setItem('wh_reset_requested', 'true');
    return true;
  }

  resetPassword(newPassword: string): boolean {
    if (
      sessionStorage.getItem('wh_reset_requested') !== 'true' ||
      newPassword.length < 8
    ) {
      return false;
    }

    sessionStorage.setItem('wh_demo_password', newPassword);
    sessionStorage.removeItem('wh_reset_requested');
    sessionStorage.removeItem('wh_pending_login');

    return true;
  }

  logout(): void {
    sessionStorage.removeItem('wh_logged_in');
    sessionStorage.removeItem('wh_pending_login');
    this.isLoggedIn.set(false);
  }
}
