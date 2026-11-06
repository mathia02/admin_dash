import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ADMIN_MODULES, RecordItem } from './admin-model';

@Component({
  selector: 'app-wayhunter-admin-full',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-full.html',
  styleUrl: './admin-full.scss'
})
export class WayhunterAdminFull implements OnInit {
  private route = inject(ActivatedRoute);
  module = 'users';
  search = '';
  filter = 'All';
  selected: RecordItem | null = null;
  editing = false;
  showForm = false;
  working: RecordItem = this.blank();
  period = 'Last 7 days';

  private version = signal(0);
  private data: Record<string, RecordItem[]> = {};

  constructor() {
    for (const [key, mod] of Object.entries(ADMIN_MODULES)) {
      this.data[key] = mod.records.map(r => ({ ...r }));
    }
    try {
      const saved = localStorage.getItem('wayhunter-full-demo');
      if (saved) {
        const parsed = JSON.parse(saved);
        for (const key of Object.keys(ADMIN_MODULES)) {
          if (Array.isArray(parsed[key])) this.data[key] = parsed[key];
        }
      }
    } catch {}
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const aliases: Record<string, string> = {
        'trips-historical-routes': 'trips',
        'reports-analytics': 'reports'
      };

      const raw = data['adminModule'] ||
        this.route.snapshot.routeConfig?.path ||
        'users';

      const normalized = aliases[raw] || raw;
      this.module = normalized === 'dashboard'
        ? 'dashboard'
        : ADMIN_MODULES[normalized] ? normalized : 'users';

      this.search = '';
      this.filter = 'All';
      this.selected = null;
      this.showForm = false;
    });
  }

  get config() {
    return ADMIN_MODULES[this.module] || ADMIN_MODULES['users'];
  }

  get rows(): RecordItem[] {
    this.version();
    return this.data[this.module] || [];
  }

  get filtered(): RecordItem[] {
    const q = this.search.toLowerCase().trim();
    return this.rows.filter(r =>
      (this.filter === 'All' || r.status === this.filter) &&
      (!q || Object.values(r).some(
        v => String(v).toLowerCase().includes(q)
      ))
    );
  }

  get statuses(): string[] {
    return ['All', ...new Set(this.rows.map(r => r.status))];
  }

  get attention(): number {
    return this.rows.filter(r =>
      ['Pending','Under Review','Reported','Review Required']
        .includes(r.status)
    ).length;
  }

  get overview() {
    this.version();
    const count = (key: string, status?: string) =>
      (this.data[key] || []).filter(
        r => !status || r.status === status
      ).length;

    return [
      { title: 'Total Users', value: count('users'), color: 'cyan', route: '/users' },
      { title: 'Published Places', value: count('places','Published'), color: 'orange', route: '/places' },
      { title: 'Active Games', value: count('games','Published'), color: 'purple', route: '/games' },
      { title: 'Hunter Reviews', value: count('location-verification','Pending'), color: 'purple', route: '/location-verification' },
      { title: 'Hazard Reports', value: count('hazards'), color: 'cyan', route: '/hazards' },
      { title: 'Merchants', value: count('merchants'), color: 'orange', route: '/merchants' },
      { title: 'Reward Requests', value: count('wallet-rewards'), color: 'purple', route: '/wallet-rewards' },
      { title: 'Ad Campaigns', value: count('advertisements'), color: 'cyan', route: '/advertisements' }
    ];
  }

  get activity() {
    return [
      { day:'Mon', height:38 }, { day:'Tue', height:58 },
      { day:'Wed', height:46 }, { day:'Thu', height:73 },
      { day:'Fri', height:62 }, { day:'Sat', height:90 },
      { day:'Sun', height:70 }
    ];
  }

  blank(): RecordItem {
    return {
      id:'', name:'', owner:'', category:'General',
      status:'Pending', district:'Sri Lanka',
      details:'', date:new Date().toISOString().slice(0,10)
    };
  }

  openAdd(): void {
    this.editing = false;
    this.working = this.blank();
    this.showForm = true;
  }

  openEdit(row: RecordItem): void {
    this.editing = true;
    this.working = { ...row };
    this.selected = null;
    this.showForm = true;
  }

  saveRecord(): void {
    if (!this.working.name.trim() ||
        !this.working.owner.trim()) {
      alert('Name and Owner are required');
      return;
    }

    const next = { ...this.working };
    const list = [...this.rows];

    if (this.editing) {
      const index = list.findIndex(x => x.id === next.id);
      if (index < 0) return;
      list[index] = next;
    } else {
      next.id = this.module.slice(0,3).toUpperCase()
        + '-' + Date.now();
      list.unshift(next);
    }

    this.data[this.module] = list;
    this.persist();
    this.log(this.editing ? 'Record Edited' : 'Record Added',
      next.id);

    this.showForm = false;
  }

  action(row: RecordItem, action: string): void {
    if (!confirm(
      'FRONTEND DEMO ONLY\n' +
      action + ': ' + row.name + '\nContinue?'
    )) return;

    const state: Record<string, string> = {
      Warn:'Warned', Suspend:'Suspended',
      Reactivate:'Active', Approve:'Approved',
      Reject:'Rejected', Publish:'Published',
      Hide:'Hidden', Activate:'Active',
      Pause:'Paused', Complete:'Completed',
      Flag:'Flagged', 'Mark Sent':'Sent',
      Cancel:'Cancelled'
    };

    const status = state[action] || action;

    this.data[this.module] = this.rows.map(r =>
      r.id === row.id ? {
        ...r, status,
        date:new Date().toISOString().slice(0,10)
      } : r
    );

    this.persist();
    this.log(action, row.id);
    this.selected = this.rows.find(r => r.id === row.id) || null;
  }

  private persist(): void {
    this.version.update(n => n + 1);
    try {
      localStorage.setItem(
        'wayhunter-full-demo', JSON.stringify(this.data)
      );
    } catch {}
  }

  private log(action: string, target: string): void {
    const entry: RecordItem = {
      id:'AUD-' + Date.now(),
      name:action, owner:'Demo Administrator',
      category:'Local Demo', status:'Recorded',
      district:'System', details:'Target: ' + target,
      date:new Date().toISOString().slice(0,10)
    };
    this.data['audit-logs'] = [
      entry, ...this.data['audit-logs']
    ];
    this.persist();
  }

  exportCsv(): void {
    const safe = (x: unknown) =>
      '"' + String(x ?? '')
        .replace(/^[=+\-@\t\r]/, "'$&")
        .replace(/"/g,'""') + '"';

    const values = [
      ['ID','Name','Owner','Category','Status','District','Details','Date'],
      ...this.filtered.map(r => [
        r.id,r.name,r.owner,r.category,
        r.status,r.district,r.details,r.date
      ])
    ];

    const csv = values.map(
      r => r.map(safe).join(',')
    ).join('\r\n');

    const url = URL.createObjectURL(new Blob(
      ['\uFEFF' + csv], { type:'text/csv;charset=utf-8' }
    ));

    const a = document.createElement('a');
    a.href = url;
    a.download = 'wayhunter-' + this.module + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  reset(): void {
    if (!confirm('Reset ALL Wayhunter demo records?')) return;
    for (const [key, mod] of Object.entries(ADMIN_MODULES)) {
      this.data[key] = mod.records.map(r => ({ ...r }));
    }
    this.persist();
    this.selected = null;
  }
}
