import { Injectable } from '@angular/core';
import { AdminRow } from '../mock-data/admin-data';

@Injectable({ providedIn: 'root' })
export class AdminDemoStore {
  private prefix = 'wh-admin-demo-';

  get(key: string, defaults: AdminRow[]): AdminRow[] {
    try {
      const saved = localStorage.getItem(this.prefix + key);
      if (saved) return JSON.parse(saved) as AdminRow[];
    } catch {}
    return defaults.map(row => ({ ...row }));
  }

  save(key: string, rows: AdminRow[]): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(rows));
  }

  addLog(action: string): void {
    const logs = this.logs();
    logs.unshift({
      action,
      time: new Date().toLocaleString()
    });
    localStorage.setItem(
      this.prefix + 'activity',
      JSON.stringify(logs.slice(0, 50))
    );
  }

  logs(): { action: string; time: string }[] {
    try {
      return JSON.parse(
        localStorage.getItem(this.prefix + 'activity') || '[]'
      );
    } catch {
      return [];
    }
  }

  reset(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }
}
