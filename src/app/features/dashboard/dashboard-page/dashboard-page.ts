import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhIcon } from '../../../shared/ui/wh-icon';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, WhIcon],
  template: `
    <div class="wh-module wh-dashboard">

      <div class="wh-page-heading">

        <div>
          <div class="wh-eyebrow">
            WAYHUNTER / COMMAND CENTER
          </div>

          <h1>
            Dashboard <span>Overview</span>
          </h1>

          <p>
            Monitor the WayHunter platform from one place.
          </p>
        </div>

        <span class="wh-demo-tag">
          FRONTEND DEMO DATA
        </span>

      </div>

      <!-- KPI CARDS -->

      <div class="wh-metric-grid wh-dashboard-metrics">

        @for (card of cards; track card.title) {
          <div
            class="wh-metric-card"
            [attr.data-tone]="card.tone"
          >

            <div class="wh-metric-icon">
              <wh-icon [name]="card.icon"></wh-icon>
            </div>

            <div class="wh-metric-info">
              <span>{{ card.title }}</span>
              <strong>{{ card.value }}</strong>
              <small>{{ card.caption }}</small>
            </div>

            <div class="wh-metric-decoration">
              <wh-icon [name]="card.icon"></wh-icon>
            </div>

          </div>
        }

      </div>

      <!-- ACTIVITY + PENDING -->

      <div class="wh-dashboard-grid">

        <section class="wh-chart-card wh-activity-card">

          <div class="wh-card-title">
            <div class="wh-section-heading">
              <div class="wh-section-icon">
                <wh-icon name="chart"></wh-icon>
              </div>

              <div>
                <h2>Platform Activity</h2>
                <p>Illustrative weekly overview</p>
              </div>
            </div>

            <span class="wh-range-label">
              Last 7 days
            </span>
          </div>

          <div class="wh-chart">

            @for (bar of activity; track bar.day) {
              <div class="wh-chart-item">

                <div class="wh-chart-track">
                  <div
                    class="wh-chart-bar"
                    [style.height.%]="bar.value"
                  ></div>
                </div>

                <span>{{ bar.day }}</span>
              </div>
            }

          </div>
        </section>

        <section class="wh-chart-card wh-pending-card">

          <div class="wh-card-title">
            <div class="wh-section-heading">
              <div class="wh-section-icon orange-icon">
                <wh-icon name="hazard"></wh-icon>
              </div>

              <div>
                <h2>Pending Actions</h2>
                <p>Quick access to management</p>
              </div>
            </div>
          </div>

          <div class="wh-pending-list">

            @for (item of pending; track item.route) {

              <a
                [routerLink]="item.route"
                class="wh-pending-item"
                [attr.data-tone]="item.tone"
              >
                <span>{{ item.title }}</span>

                <strong>{{ item.count }}</strong>
              </a>

            }

          </div>

        </section>

      </div>

      <!-- QUICK MANAGEMENT -->

      <section class="wh-chart-card wh-quick-panel">

        <div class="wh-card-title">

          <div class="wh-section-heading">

            <div class="wh-section-icon">
              <wh-icon name="dashboard"></wh-icon>
            </div>

            <div>
              <h2>Quick Management</h2>
              <p>Open any module directly</p>
            </div>

          </div>

        </div>

        <div class="wh-quick-grid">

          @for (link of quickLinks; track link.route) {

            <a
              class="wh-quick-link"
              [routerLink]="link.route"
              [attr.data-tone]="link.tone"
            >

              <div class="wh-quick-icon">
                <wh-icon [name]="link.icon"></wh-icon>
              </div>

              <div class="wh-quick-label">
                <strong>{{ link.title }}</strong>
                <small>Open module</small>
              </div>

              <wh-icon name="arrow"></wh-icon>

            </a>
          }

        </div>

      </section>

      <div class="wh-demo-note">
        All statistics are sample values. Backend and
        database integration are not connected.
      </div>

    </div>
  `
})
export class DashboardPage {

  readonly cards = [
    {
      title: 'Total Users',
      value: '1,284',
      caption: 'Sample registered accounts',
      icon: 'users',
      tone: 'cyan'
    },
    {
      title: 'Published Places',
      value: '326',
      caption: 'Sample locations',
      icon: 'places',
      tone: 'orange'
    },
    {
      title: 'Active Games',
      value: '18',
      caption: 'Sample challenges',
      icon: 'game',
      tone: 'purple'
    },
    {
      title: 'Pending Reviews',
      value: '06',
      caption: 'Sample submissions',
      icon: 'reports',
      tone: 'purple'
    },
    {
      title: 'Active Hazards',
      value: '03',
      caption: 'Sample safety alerts',
      icon: 'hazard',
      tone: 'cyan'
    },
    {
      title: 'Merchants',
      value: '12',
      caption: 'Sample partners',
      icon: 'merchant',
      tone: 'orange'
    }
  ];

  readonly activity = [
    { day: 'Mon', value: 38 },
    { day: 'Tue', value: 58 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 74 },
    { day: 'Fri', value: 62 },
    { day: 'Sat', value: 92 },
    { day: 'Sun', value: 71 }
  ];

  readonly pending = [
    {
      title: 'Hunter Verifications',
      count: '06',
      route: '/location-verification',
      tone: 'cyan'
    },
    {
      title: 'Reward Requests',
      count: '09',
      route: '/wallet-rewards',
      tone: 'orange'
    },
    {
      title: 'Hazard Reports',
      count: '03',
      route: '/hazards',
      tone: 'cyan'
    },
    {
      title: 'Merchant Applications',
      count: '04',
      route: '/merchants',
      tone: 'purple'
    }
  ];

  readonly quickLinks = [
    {
      title: 'Manage Users',
      icon: 'users',
      route: '/users',
      tone: 'cyan'
    },
    {
      title: 'Manage Places',
      icon: 'pin',
      route: '/places',
      tone: 'orange'
    },
    {
      title: 'Manage Games',
      icon: 'game',
      route: '/games',
      tone: 'purple'
    },
    {
      title: 'Manage Merchants',
      icon: 'merchant',
      route: '/merchants',
      tone: 'cyan'
    },
    {
      title: 'Hazard Monitoring',
      icon: 'hazard',
      route: '/hazards',
      tone: 'orange'
    },
    {
      title: 'Wallet & Rewards',
      icon: 'wallet',
      route: '/wallet-rewards',
      tone: 'purple'
    },
    {
      title: 'Reports',
      icon: 'reports',
      route: '/reports-analytics',
      tone: 'cyan'
    },
    {
      title: 'Settings',
      icon: 'settings',
      route: '/settings',
      tone: 'orange'
    }
  ];
}
