import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="wh-photo-auth">

      <!-- Original cinematic reference artwork -->
      <div class="wh-photo-background"
           aria-hidden="true"></div>

      <!-- Covers the old form embedded in the artwork -->
      <div class="wh-photo-mask"
           aria-hidden="true"></div>

      <!-- Animated blue/orange lighting -->
      <div class="wh-photo-light"
           aria-hidden="true"></div>

      <!-- Moving ambient particles -->
      <div class="wh-photo-particles"
           aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- Real Angular logo and authentication -->
      <section class="wh-photo-center">

        <div class="wh-photo-logo-wrap">
          <img
            src="/images/logo/wayhunter-logo.jpg"
            class="wh-photo-logo"
            alt="Original WayHunter Logo"
          />
        </div>

        <div class="wh-photo-login">
          <router-outlet></router-outlet>
        </div>

      </section>

    </main>
  `
})
export class AuthLayout {}
