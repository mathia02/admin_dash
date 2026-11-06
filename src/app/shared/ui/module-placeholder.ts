import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-module-placeholder',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="module-placeholder">

      <div class="eyebrow">WAYHUNTER / ADMIN MODULE</div>

      <div class="placeholder-icon"></div>

      <h1>{{ title }}</h1>

      <p>
        This module is part of WayHunter Admin.
        Its full frontend UI will be developed
        in the next steps.
      </p>

      <div class="placeholder-label">
        FRONTEND DEVELOPMENT STAGE
      </div>

      <a routerLink="/dashboard" class="primary-btn inline-btn">
         Back to Dashboard
      </a>

    </div>
  `
})
export class ModulePlaceholder {

  title = 'Admin Module';

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.title = data['title'] || 'Admin Module';
    });
  }
}
