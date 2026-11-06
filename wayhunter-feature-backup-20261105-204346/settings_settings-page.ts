import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminDemoStore } from '../../core/services/admin-demo-store';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="wh-module">

      <div class="wh-page-heading">
        <div>
          <div class="wh-eyebrow">WAYHUNTER / ADMIN SETTINGS</div>
          <h1>Admin Settings</h1>
          <p>Manage demo profile and interface preferences.</p>
        </div>
      </div>

      <div class="wh-settings-grid">

        <section class="wh-settings-card">
          <h2>Administrator Profile</h2>
          <p>Single administrator account preview.</p>

          <div class="wh-modal-field">
            <label>Display Name</label>
            <input [(ngModel)]="displayName" />
          </div>

          <div class="wh-modal-field">
            <label>Email</label>
            <input
              value="admin@wayhunter.lk"
              disabled
            />
          </div>

          <div class="wh-modal-field">
            <label>Access Role</label>
            <input value="Administrator" disabled />
          </div>

          <button class="wh-btn wh-btn-primary" (click)="save()">
            Save Preferences
          </button>

          @if (message) {
            <p class="wh-success-message">{{ message }}</p>
          }
        </section>

        <section class="wh-settings-card">
          <h2>Notifications</h2>
          <p>Frontend notification preferences.</p>

          <label class="wh-toggle-row">
            <span>Safety & Hazard Alerts</span>
            <input type="checkbox" [(ngModel)]="hazardAlerts" />
          </label>

          <label class="wh-toggle-row">
            <span>Location Review Updates</span>
            <input type="checkbox" [(ngModel)]="locationAlerts" />
          </label>

          <label class="wh-toggle-row">
            <span>Merchant & Reward Updates</span>
            <input type="checkbox" [(ngModel)]="rewardAlerts" />
          </label>

          <label class="wh-toggle-row">
            <span>Game Monitoring Updates</span>
            <input type="checkbox" [(ngModel)]="gameAlerts" />
          </label>

          <button class="wh-btn wh-btn-primary" (click)="save()">
            Save Notification Settings
          </button>
        </section>

        <section class="wh-settings-card">
          <h2>Security & Password</h2>
          <p>Password changes in this prototype are demo-only.</p>

          <div class="wh-settings-actions">
            <a class="wh-btn wh-btn-secondary"
               routerLink="/auth/forgot-password">
              Demo Password Reset
            </a>
          </div>
        </section>

        <section class="wh-settings-card">
          <h2>Activity Log</h2>
          <p>Recent changes made inside this demo browser.</p>

          @for (log of logs; track $index) {
            <div class="wh-activity-line">
              <span>{{ log.action }}</span>
              <small>{{ log.time }}</small>
            </div>
          }

          @if (logs.length === 0) {
            <p>No demo changes recorded yet.</p>
          }
        </section>

        <section class="wh-settings-card wh-settings-wide">
          <h2>Demo Data Management</h2>
          <p>
            Reset all locally edited module records to their original
            sample values. No real database is involved.
          </p>

          <button class="wh-btn wh-btn-danger" (click)="resetData()">
            Reset All Demo Data
          </button>
        </section>

      </div>

    </div>
  `
})
export class SettingsPage {

  displayName = 'WayHunter Administrator';

  hazardAlerts = true;
  locationAlerts = true;
  rewardAlerts = true;
  gameAlerts = true;

  message = '';

  logs: { action: string; time: string }[] = [];

  constructor(private store: AdminDemoStore) {
    this.load();
  }

  load(): void {
    try {
      const raw = localStorage.getItem('wh-admin-settings');

      if (raw) {
        const data = JSON.parse(raw);
        this.displayName = data.displayName || this.displayName;
        this.hazardAlerts = data.hazardAlerts ?? true;
        this.locationAlerts = data.locationAlerts ?? true;
        this.rewardAlerts = data.rewardAlerts ?? true;
        this.gameAlerts = data.gameAlerts ?? true;
      }
    } catch {}

    this.logs = this.store.logs().slice(0, 8);
  }

  save(): void {
    localStorage.setItem(
      'wh-admin-settings',
      JSON.stringify({
        displayName: this.displayName,
        hazardAlerts: this.hazardAlerts,
        locationAlerts: this.locationAlerts,
        rewardAlerts: this.rewardAlerts,
        gameAlerts: this.gameAlerts
      })
    );

    this.message = 'Demo settings saved successfully.';
  }

  resetData(): void {
    if (!window.confirm('Reset all demo module records?')) return;

    this.store.reset();
    this.logs = [];
    this.message = 'Demo records reset. Reopen modules to see defaults.';
  }
}
