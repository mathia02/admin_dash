import { Component } from '@angular/core';
import { AdminModulePage } from '../../shared/ui/admin-module-page';
import { MODULES } from '../../core/mock-data/admin-data';

@Component({
  selector: 'app-reports-analytics-page',
  standalone: true,
  imports: [AdminModulePage],
  template: '<app-admin-module-page [definition]="definition"></app-admin-module-page>'
})
export class ReportsAnalyticsPage {
  readonly definition = MODULES['reports-analytics'];
}
