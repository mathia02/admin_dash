import { Injectable, signal, computed } from '@angular/core';

export interface AdminRow {
  id: string;
  name: string;
  owner: string;
  type: string;
  status: string;
  details: string;
  date: string;
}

export interface AdminSection {
  title: string;
  description: string;
  accent: string;
  actions: string[];
  rows: AdminRow[];
}

const sample = (
  id: string, name: string, owner: string,
  type: string, status: string, details: string
): AdminRow => ({
  id, name, owner, type, status, details,
  date: '2026-11-05'
});

export const SECTIONS: Record<string, AdminSection> = {
  users: {
    title: 'Users Management',
    description: 'Accounts, warnings, suspension and reactivation',
    accent: '#16d6f4',
    actions: ['Warn', 'Suspend', 'Reactivate'],
    rows: [
      sample('USE-001', 'Demo Traveller 01', 'traveller01@example.com',
        'Traveller', 'Active', 'District: Jaffna; Trips: 3; Hunter places: 0'),
      sample('USE-002', 'Demo Hunter 02', 'hunter02@example.com',
        'Hunter', 'Active', 'District: Kandy; Discoveries: 4'),
      sample('USE-003', 'Demo Traveller 03', 'traveller03@example.com',
        'Traveller', 'Warned', 'District: Colombo; Warning: Demo moderation notice'),
      sample('USE-004', 'Demo Hunter 04', 'hunter04@example.com',
        'Hunter', 'Active', 'District: Galle; Discoveries: 2'),
      sample('USE-005', 'Demo Traveller 05', 'traveller05@example.com',
        'Traveller', 'Suspended', 'District: Nuwara Eliya; Account under review')
    ]
  },
  'location-verification': {
    title: 'Location Verification',
    description: 'Hunter evidence, GPS and 200m duplicate screening',
    accent: '#ffa726',
    actions: ['Under Review', 'Approve', 'Reject'],
    rows: [
      sample('HNT-001', 'Northern Heritage View', 'Demo Hunter 02',
        '360 + Photo', 'Pending',
        'District: Jaffna; GPS: demo coordinates; 360 video: demo reference; Photo: demo reference; 200m duplicate screening: Pending'),
      sample('HNT-002', 'Coastal Viewpoint', 'Demo Hunter 04',
        '360 + Photo', 'Under Review',
        'GPS validation: pending; Possible duplicate: requires human review'),
      sample('HNT-003', 'Mountain Trail Point', 'Demo Hunter 02',
        '360 + Photo', 'Approved',
        'Demo approval only; reward is not credited to a real wallet')
    ]
  },
  advertisements: {
    title: 'Advertisements',
    description: 'Banner ads, sponsored places and campaign analytics',
    accent: '#13d6ef',
    actions: ['Activate', 'Pause', 'Complete'],
    rows: [
      sample('ADS-001', 'Tourism Banner Campaign', 'Demo Advertiser',
        'Home Banner', 'Active', 'Views: 1450; Clicks: 82; CTR: 5.66%; Sponsored label required'),
      sample('ADS-002', 'Sponsored Restaurant', 'Demo Partner',
        'Sponsored Place', 'Paused', 'Views: 560; Clicks: 35; Sponsored placement'),
      sample('ADS-003', 'Game Promotion', 'Demo Sponsor',
        'Sponsored Game', 'Pending', 'Reward campaign; commercial approval pending')
    ]
  },
  places: {
    title: 'Places Management',
    description: 'Published locations, visibility and content moderation',
    accent: '#ffa726',
    actions: ['Publish', 'Hide'],
    rows: [
      sample('PLC-001', 'Jaffna Fort', 'Demo Catalogue',
        'Historical', 'Published', 'Public place information; Demo record'),
      sample('PLC-002', 'Coastal Viewpoint', 'Demo Hunter 04',
        'Nature', 'Published', 'Approved demonstration location'),
      sample('PLC-003', 'Hill View', 'Demo Hunter 02',
        'Nature', 'Hidden', 'Hidden for moderation')
    ]
  },
  trips: {
    title: 'Trips & Routes',
    description: 'Created, active and completed journeys',
    accent: '#13d6ef',
    actions: [],
    rows: [
      sample('TRP-001', 'Northern Explorer', 'Demo Traveller 01',
        'Jaffna to Point Pedro', 'Active', 'Members: 3; Route: demo data'),
      sample('TRP-002', 'Hill Country Visit', 'Demo Traveller 03',
        'Kandy to Ella', 'Completed', 'Completed trip summary'),
      sample('TRP-003', 'Coastal Tour', 'Demo Traveller 05',
        'Galle to Matara', 'Created', 'Upcoming trip')
    ]
  },
  hazards: {
    title: 'Hazard Reports',
    description: 'Community incidents and investigations',
    accent: '#ff9a42',
    actions: ['Investigating', 'Resolved', 'Dismissed'],
    rows: [
      sample('HZD-001', 'Road Obstruction', 'Demo Traveller 01',
        'Road Hazard', 'Reported', 'Community-reported; not independently verified'),
      sample('HZD-002', 'Flooded Road', 'Demo Traveller 03',
        'Flooding', 'Investigating', 'Investigation demo'),
      sample('HZD-003', 'Fallen Tree', 'Demo Traveller 01',
        'Obstruction', 'Resolved', 'Demo resolution')
    ]
  },
  'group-trips': {
    title: 'Group Trips',
    description: 'Members, invitations and sharing issues',
    accent: '#19d7f8',
    actions: ['Investigating', 'Resolved'],
    rows: [
      sample('GRP-001', 'Northern Travel Group', 'Demo Traveller 01',
        '4 Members', 'Active', 'Invites: 2 accepted; sharing requires individual consent'),
      sample('GRP-002', 'Weekend Explorers', 'Demo Traveller 03',
        '3 Members', 'Reported', 'Membership dispute demonstration')
    ]
  },
  games: {
    title: 'Games Management',
    description: 'Publication review, proof verification and results',
    accent: '#b76cff',
    actions: ['Under Review', 'Approve', 'Reject'],
    rows: [
      sample('GME-001', 'Heritage Photo Hunt', 'Demo Creator 01',
        'Photo & Text Hints', 'Pending',
        '3 stages; timer: 45 minutes; publication requires review'),
      sample('GME-002', 'Nature Clue Challenge', 'Demo Creator 02',
        'Photo & Text Hints', 'Published',
        '2 stages; verified winners: demo only'),
      sample('GME-003', 'Mystery Location', 'Demo Creator 03',
        'Proof Investigation', 'Under Review',
        'Suspicious player proof; manual verification required')
    ]
  },
  'wallet-rewards': {
    title: 'Wallet & Rewards',
    description: 'HP, RC, ledger and reward approval requests',
    accent: '#ba70ff',
    actions: ['Under Review', 'Approve', 'Reject'],
    rows: [
      sample('RWD-001', 'Voucher Request', 'Demo Traveller 01',
        '500 RC', 'Pending',
        'Available RC: 1200; Reserved RC: 500; Voucher: example only'),
      sample('RWD-002', 'HP to RC Exchange', 'Demo Hunter 02',
        '100 HP to 10 RC', 'Under Review',
        'Server validation and ledger required for production'),
      sample('RWD-003', 'Voucher Fulfillment', 'Demo Traveller 03',
        '750 RC', 'Approved',
        'Admin approval demo; no actual voucher issued')
    ]
  },
  merchants: {
    title: 'Merchants & Vouchers',
    description: 'Partner inventory, applications and allocations',
    accent: '#ffab37',
    actions: ['Approve', 'Reject', 'Activate'],
    rows: [
      sample('MRC-001', 'Demo Grocery Voucher', 'Sample Partner',
        'Digital Voucher', 'Pending',
        'Stock: 20; 500 RC example price; no live partnership'),
      sample('MRC-002', 'Demo Dining Voucher', 'Sample Restaurant',
        'Digital Voucher', 'Active',
        'Stock: 12; Fulfillment: demo code allocation only'),
      sample('MRC-003', 'Demo Travel Offer', 'Sample Hotel',
        'Physical Voucher', 'Pending',
        'Stock: 5; Merchant validation agreement not configured')
    ]
  },
  reports: {
    title: 'Reports & Analytics',
    description: 'Platform metrics and exportable demo reports',
    accent: '#10d8f4',
    actions: [],
    rows: [
      sample('RPT-001', 'User Growth Report', 'Admin',
        'Users', 'Ready', 'Sample registrations and active accounts'),
      sample('RPT-002', 'Hunter Verification Report', 'Admin',
        'Hunter', 'Ready', 'Pending, approved and rejected counts'),
      sample('RPT-003', 'Game Results Report', 'Admin',
        'Games', 'Ready', 'Game publication and verification activity'),
      sample('RPT-004', 'Reward Transactions', 'Admin',
        'Wallet', 'Ready', 'Sample HP and RC reports'),
      sample('RPT-005', 'Advertisement Performance', 'Admin',
        'Ads', 'Ready', 'Sample impressions and clicks')
    ]
  },
  notifications: {
    title: 'Notifications',
    description: 'Operational messages and announcements',
    accent: '#15d6ef',
    actions: ['Mark Sent', 'Cancel'],
    rows: [
      sample('NTF-001', 'Hunter Review Update', 'Hunters',
        'Verification', 'Draft', 'Notification template demonstration'),
      sample('NTF-002', 'Safety Advisory', 'Travellers',
        'Safety', 'Draft', 'Community safety reminder; not an emergency alert'),
      sample('NTF-003', 'Voucher Status Update', 'Wallet Users',
        'Rewards', 'Sent', 'Example successful notification')
    ]
  },
  'audit-logs': {
    title: 'Audit Logs',
    description: 'Administrative decisions and change history',
    accent: '#bc75ff',
    actions: [],
    rows: [
      sample('AUD-001', 'Demo Sign In', 'Demo Administrator',
        'Authentication', 'Recorded', 'Local demonstration event'),
      sample('AUD-002', 'Review Sample', 'Demo Administrator',
        'Hunter', 'Recorded', 'Illustrative review history')
    ]
  },
  settings: {
    title: 'Admin Settings',
    description: 'Admin profile, permissions and configuration',
    accent: '#15d9ef',
    actions: [],
    rows: [
      sample('SET-001', 'Admin Profile', 'Administrator',
        'Profile', 'Configured', 'Demo profile configuration'),
      sample('SET-002', 'Roles & Permissions', 'Administrator',
        'Security', 'Review Required', 'Production permission policies must be enforced by the API'),
      sample('SET-003', 'Rewards Configuration', 'Administrator',
        'Wallet', 'Configured', 'Reference: 100 HP = 10 RC; 100 RC = LKR 10 internal only'),
      sample('SET-004', 'Provider Configuration', 'Administrator',
        'Integrations', 'Not Connected', 'Map, Cloudinary, AI, OTP and push credentials')
    ]
  }
};

@Injectable({ providedIn: 'root' })
export class AdminDemoDataService {
  private readonly storageKey = 'wayhunter-admin-demo-v2';

  private readonly store = signal<Record<string, AdminRow[]>>(
    this.load()
  );

  private load(): Record<string, AdminRow[]> {
    const initial = Object.fromEntries(
      Object.entries(SECTIONS).map(([key, value]) => [
        key, value.rows.map(row => ({ ...row }))
      ])
    );

    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return initial;

      const parsed = JSON.parse(saved) as Record<string, AdminRow[]>;

      for (const key of Object.keys(initial)) {
        if (Array.isArray(parsed[key])) initial[key] = parsed[key];
      }
    } catch {
      // Storage unavailable: use in-memory data.
    }

    return initial;
  }

  rows(module: string): AdminRow[] {
    return this.store()[module] || [];
  }

  count(module: string): number {
    return this.rows(module).length;
  }

  update(module: string, id: string, status: string): void {
    const current = this.store();
    const next = {
      ...current,
      [module]: this.rows(module).map(row =>
        row.id === id ? {
          ...row, status,
          date: new Date().toISOString().slice(0, 10)
        } : row
      )
    };

    this.store.set(next);
    this.persist(next);
    this.log('Status changed', `${module}: ${id} -> ${status}`);
  }

  add(module: string, row: AdminRow): void {
    const next = {
      ...this.store(),
      [module]: [...this.rows(module), row]
    };
    this.store.set(next);
    this.persist(next);
    this.log('Demo record added', `${module}: ${row.id}`);
  }

  private log(action: string, description: string): void {
    const next = {
      ...this.store(),
      'audit-logs': [
        {
          id: 'AUD-' + Date.now(),
          name: action,
          owner: 'Demo Administrator',
          type: 'Local Demo',
          status: 'Recorded',
          details: description,
          date: new Date().toISOString().slice(0, 10)
        },
        ...this.rows('audit-logs')
      ]
    };

    this.store.set(next);
    this.persist(next);
  }

  reset(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch {}
    this.store.set(
      Object.fromEntries(
        Object.entries(SECTIONS).map(([key, value]) => [
          key, value.rows.map(row => ({ ...row }))
        ])
      )
    );
  }

  private persist(data: Record<string, AdminRow[]>): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch {}
  }
}
