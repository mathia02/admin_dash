import { Component, Input } from '@angular/core';

@Component({
  selector: 'wh-icon',
  standalone: true,
  template: `
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path [attr.d]="icons[name] || icons['dashboard']"></path>
    </svg>
  `
})
export class WhIcon {
  @Input() name = 'dashboard';

  readonly icons: Record<string, string> = {
    dashboard:
      'M3 3h8v8H3z M13 3h8v5h-8z M13 10h8v11h-8z M3 13h8v8H3z',

    users:
      'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M17 11a4 4 0 0 0-1-8 M22 21v-2a4 4 0 0 0-3-3.87',

    pin:
      'M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',

    ads:
      'M3 11v2 M5 9h4l10-5v16L9 15H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2 M8 15l2 6h3',

    places:
      'M12 2 3 7l9 5 9-5-9-5Z M3 12l9 5 9-5 M3 17l9 5 9-5',

    trips:
      'M4 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4 M20 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4 M9 7c6-5 7 8 0 9 M4 15V9 M14 18h6v-5',

    hazard:
      'M10.3 3.9 1.9 18.3a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z M12 9v4 M12 17h.01',

    group:
      'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M17 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87',

    game:
      'M6 12h4 M8 10v4 M15 11h.01 M18 13h.01 M6.5 6h11a4 4 0 0 1 3.8 3l1.2 7a3 3 0 0 1-5 2.8L15 17H9l-2.5 1.8a3 3 0 0 1-5-2.8l1.2-7A4 4 0 0 1 6.5 6Z',

    wallet:
      'M20 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5 M16 14h6 M18 14h.01',

    merchant:
      'M3 10h18l-2-7H5l-2 7Z M5 10v11h14V10 M9 21v-7h6v7',

    reports:
      'M4 20V10h4v10 M10 20V4h4v16 M16 20v-8h4v8 M2 21h20',

    settings:
      'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7 M12 2v2 M12 20v2 M4.93 4.93l1.42 1.42 M17.65 17.65l1.42 1.42 M2 12h2 M20 12h2 M4.93 19.07l1.42-1.42 M17.65 6.35l1.42-1.42',

    logout:
      'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',

    chart:
      'M3 20h18 M6 16v-5 M11 16V5 M16 16V9 M21 16V3',

    arrow:
      'M5 12h14 M13 6l6 6-6 6',

    check:
      'M4 12l5 5L20 6'
  };
}
