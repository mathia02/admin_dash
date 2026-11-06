export interface RecordItem {
  id: string;
  name: string;
  owner: string;
  category: string;
  status: string;
  district: string;
  details: string;
  date: string;
}

export interface ModuleDefinition {
  title: string;
  description: string;
  fields: string[];
  workflow: string[];
  rules: string[];
  actions: string[];
  records: RecordItem[];
}

function rec(
  id: string,
  name: string,
  owner: string,
  category: string,
  status: string,
  district: string,
  details: string
): RecordItem {
  return {
    id, name, owner, category, status, district, details,
    date: '2026-11-05'
  };
}

export const ADMIN_MODULES: Record<string, ModuleDefinition> = {
  users: {
    title: 'Users Management',
    description: 'Registered users, contributions and moderation',
    fields: [
      'User ID, full name, email and contact',
      'Registration date and district',
      'Account status and profile privacy',
      'Created and completed trips',
      'Hunter discoveries',
      'Created and played games',
      'HP / RC transaction references',
      'Reports, warnings and suspensions'
    ],
    workflow: [
      'Search and open user profile',
      'Check contributions and complaints',
      'Warn, suspend or reactivate',
      'Record moderator decision'
    ],
    rules: [
      'User privacy must be protected',
      'Admin actions require authorization and audit',
      'Traveller, Hunter and Game are features, not mandatory separate account roles'
    ],
    actions: ['Warn', 'Suspend', 'Reactivate'],
    records: [
      rec('USE-001','Demo Traveller 01','traveller01@example.com','User','Active','Jaffna','Trips: 3; RC: 1200'),
      rec('USE-002','Demo Hunter 02','hunter02@example.com','User','Active','Kandy','Discoveries: 4; HP: 700'),
      rec('USE-003','Demo Traveller 03','traveller03@example.com','User','Warned','Colombo','Warning for reported content'),
      rec('USE-004','Demo User 04','user04@example.com','User','Active','Galle','Games: 5'),
      rec('USE-005','Demo User 05','user05@example.com','User','Suspended','Nuwara Eliya','Account under review')
    ]
  },

  'location-verification': {
    title: 'Location Verification',
    description: 'Hunter GPS, live evidence and publication review',
    fields: [
      'Hunter ID and submission ID',
      'Place name, description and district',
      'GPS coordinates, accuracy and timestamp',
      'Live guided 360 video reference',
      'Live normal photo reference',
      '200m nearby duplicate candidates',
      'Photo similarity and reviewer notes',
      'Publication and reward status'
    ],
    workflow: [
      'Check submitted district and GPS',
      'Review 360 video and photo evidence',
      'Check 200m duplicate candidates',
      'Approve, reject or escalate',
      'Publish and award only through authorized backend'
    ],
    rules: [
      'No gallery proof for Hunter',
      'Distance alone does not prove duplication',
      'No automatic publication',
      'No RC credit before verified approval'
    ],
    actions: ['Under Review','Approve','Reject'],
    records: [
      rec('HNT-001','Northern Heritage View','Demo Hunter 02','Discovery','Pending','Jaffna','GPS: 9.6615,80.0255; 360: Demo media reference; Photo: Demo reference; Duplicate: Unknown'),
      rec('HNT-002','Coastal View','Demo Hunter 04','Discovery','Under Review','Galle','GPS pending validation; Possible duplicate candidate'),
      rec('HNT-003','Hill Discovery','Demo Hunter 02','Discovery','Approved','Kandy','Demo decision; no actual RC credit')
    ]
  },

  advertisements: {
    title: 'Advertisements',
    description: 'Banners, sponsored places, campaigns and performance',
    fields: [
      'Campaign ID and advertiser',
      'Banner image and target URL',
      'Home banner placement',
      'Sponsored hotel and restaurant placement',
      'Sponsored games',
      'Start date and end date',
      'Views, clicks and CTR',
      'Campaign billing and revenue',
      'Sponsored disclosure'
    ],
    workflow: [
      'Create advertisement campaign',
      'Choose placement and schedule',
      'Review sponsored disclosure',
      'Activate, pause or complete',
      'Review views, clicks and revenue'
    ],
    rules: [
      'Sponsor content must be disclosed',
      'Paid promotion cannot bypass verification'
    ],
    actions: ['Activate','Pause','Complete'],
    records: [
      rec('ADS-001','Tourism Home Banner','Demo Sponsor','Home Banner','Active','Sri Lanka','Views: 1450; Clicks: 82; Revenue: sample'),
      rec('ADS-002','Restaurant Promotion','Demo Partner','Sponsored Place','Paused','Jaffna','Views: 560; Clicks: 35'),
      rec('ADS-003','Sponsored Game','Demo Sponsor','Game Campaign','Pending','Sri Lanka','Approval required')
    ]
  },

  places: {
    title: 'Places Management',
    description: 'Published locations, visibility and moderation',
    fields: [
      'Place ID and place name',
      'District and GPS',
      'Category and description',
      'Public photos and attribution',
      'Hunter contributor reference',
      'Verification and publication state',
      'Incorrect information reports',
      'Moderation notes'
    ],
    workflow: [
      'Search places',
      'Inspect public information',
      'Review reported content',
      'Publish or hide through authorized process'
    ],
    rules: [
      'Only approved places may be published',
      'Private verification evidence must remain protected'
    ],
    actions: ['Publish','Hide'],
    records: [
      rec('PLC-001','Jaffna Fort','Demo Catalogue','Heritage','Published','Jaffna','Public catalogue sample'),
      rec('PLC-002','Coastal Viewpoint','Demo Hunter','Nature','Published','Galle','Approved demo place'),
      rec('PLC-003','Hill View','Demo Hunter','Nature','Hidden','Kandy','Moderation review')
    ]
  },

  trips: {
    title: 'Trips & Routes',
    description: 'Trip creation, active journeys and completion analytics',
    fields: [
      'Trip ID, name and owner',
      'Start and end dates',
      'Start, stops and end location',
      'Budget, vehicle and headcount',
      'Created, active or completed status',
      'Shared group participants',
      'Suggested or AI plan reference',
      'Completion statistics and incident reports'
    ],
    workflow: [
      'Filter created, active and completed trips',
      'Review permitted trip details',
      'Inspect authorized incidents',
      'Generate trip usage report'
    ],
    rules: [
      'Private trips remain protected',
      'No unrestricted live GPS monitoring',
      'Do not fabricate missing routes'
    ],
    actions: ['Flag','Under Review','Resolved'],
    records: [
      rec('TRP-001','Northern Explorer','Demo Traveller 01','Trip','Active','Jaffna','Jaffna to Point Pedro; Members: 3'),
      rec('TRP-002','Hill Country Tour','Demo Traveller 03','Trip','Completed','Kandy','Kandy to Ella'),
      rec('TRP-003','Coastal Weekend','Demo Traveller 04','Trip','Created','Galle','Galle to Matara')
    ]
  },

  hazards: {
    title: 'Hazard Reports',
    description: 'Community safety incidents and investigation',
    fields: [
      'Hazard ID and reporter reference',
      'Category, reason and description',
      'GPS and timestamp',
      'Camera photo or video',
      'Community-reported status',
      'Repeated incident reports',
      'Investigation and resolution history'
    ],
    workflow: [
      'Review hazard report',
      'Inspect incident evidence',
      'Investigate repeated reports',
      'Update status and record decision'
    ],
    rules: [
      'Every hazard does not need mandatory photo approval',
      'Community hazards are not authoritative emergency advice'
    ],
    actions: ['Investigating','Resolved','Dismissed'],
    records: [
      rec('HZD-001','Road Obstruction','Demo Traveller','Road','Reported','Jaffna','Community report; unverified'),
      rec('HZD-002','Flooded Road','Demo Traveller','Flood','Investigating','Colombo','Investigation sample'),
      rec('HZD-003','Fallen Tree','Demo Traveller','Road','Resolved','Kandy','Resolution demo')
    ]
  },

  'group-trips': {
    title: 'Group Trips',
    description: 'Trip members, invitations and sharing issues',
    fields: [
      'Group ID and trip name',
      'Organizer and members',
      'Pending, accepted and declined invites',
      'Member count',
      'GPS sharing opt-in status',
      'Paused, revoked and offline states',
      'Membership and sharing complaints'
    ],
    workflow: [
      'View authorized group',
      'Review invitation issues',
      'Investigate consent complaints',
      'Record resolution'
    ],
    rules: [
      'Accepted invitation does not imply GPS consent',
      'Sharing ends when trip finishes or consent is revoked'
    ],
    actions: ['Investigating','Resolved'],
    records: [
      rec('GRP-001','Northern Group','Demo Traveller 01','Group','Active','Jaffna','Members: 4; Accepted: 3'),
      rec('GRP-002','Weekend Explorers','Demo Traveller 03','Group','Reported','Kandy','Sharing complaint')
    ]
  },

  games: {
    title: 'Games Management',
    description: 'Game publication, proof review and verified winners',
    fields: [
      'Game ID, title and creator',
      'Description and cover photo',
      'Clue photos and text hints',
      'Stages and time limit',
      'Configured RC reward',
      'Draft, pending or published state',
      'Player live-camera proof',
      'Suspicious activity and appeals',
      'Verified results and winner eligibility'
    ],
    workflow: [
      'Review creator submission',
      'Check photo and text hints',
      'Approve or reject publication',
      'Investigate player proof',
      'Confirm eligible results through backend'
    ],
    rules: [
      'No compulsory map or kilometre hint',
      'No automatic game publication',
      'Player proof must use live capture',
      'Reward only verified eligible winners once'
    ],
    actions: ['Under Review','Approve','Reject'],
    records: [
      rec('GME-001','Heritage Photo Hunt','Demo Creator 01','Game','Pending','Jaffna','3 photo and text stages; Timer: 45 min'),
      rec('GME-002','Nature Challenge','Demo Creator 02','Game','Published','Kandy','2 stages; Published demo'),
      rec('GME-003','Mystery Hunt','Demo Creator 03','Proof','Under Review','Colombo','Suspicious proof investigation')
    ]
  },

  'wallet-rewards': {
    title: 'Wallet & Rewards',
    description: 'HP, RC, ledger and redemption request audit',
    fields: [
      'Wallet owner reference',
      'Spendable HP and Lifetime HP',
      'Available RC and reserved RC',
      'Earned, exchanged and spent entries',
      'Transaction reference and status',
      'Voucher redemption request',
      'Actual offer RC price',
      'Fulfillment and rejection history',
      'Fraud and reconciliation flags'
    ],
    workflow: [
      'Inspect authorized ledger',
      'Review pending redemption',
      'Check account and stock eligibility',
      'Approve or reject through backend',
      'Reconcile holds and releases'
    ],
    rules: [
      '100 HP = 10 RC',
      '100 RC = LKR 10 internal reference only',
      'Minimum redemption eligibility: 100 RC',
      'No direct cash-out',
      'No frontend-authoritative balance changes'
    ],
    actions: ['Under Review','Approve','Reject'],
    records: [
      rec('RWD-001','Demo Voucher Request','Demo Traveller 01','500 RC','Pending','Jaffna','Available: 1200 RC; Reserved: 500 RC'),
      rec('RWD-002','HP to RC Exchange','Demo Hunter 02','100 HP','Under Review','Kandy','Reference conversion: 10 RC'),
      rec('RWD-003','Reward Fulfillment','Demo Traveller 03','750 RC','Approved','Colombo','No real voucher issued')
    ]
  },

  merchants: {
    title: 'Merchants & Vouchers',
    description: 'Business partners, voucher stock and fulfillment',
    fields: [
      'Partner ID and merchant name',
      'Partner contact and agreement',
      'Commission and settlement information',
      'Physical or digital voucher type',
      'Partner-specific RC price',
      'Stock, reserved stock and expiry',
      'Voucher requests and approval',
      'Secure code allocation',
      'Used and expired voucher reconciliation'
    ],
    workflow: [
      'Register merchant and offer',
      'Import voucher inventory',
      'Verify user redemption request',
      'Allocate once after authorization',
      'Reconcile redeemed and expired vouchers'
    ],
    rules: [
      'Only contracted vouchers are valid',
      'No duplicate code allocation',
      'A separate merchant portal is not required initially'
    ],
    actions: ['Approve','Reject','Activate'],
    records: [
      rec('MRC-001','Demo Grocery Voucher','Sample Partner','Digital','Pending','Sri Lanka','Stock: 20; Price: sample'),
      rec('MRC-002','Demo Dining Voucher','Sample Restaurant','Digital','Active','Jaffna','Stock: 12'),
      rec('MRC-003','Demo Travel Voucher','Sample Hotel','Physical','Pending','Kandy','Stock: 5')
    ]
  },

  reports: {
    title: 'Reports & Analytics',
    description: 'User growth, travel, verification and commercial KPIs',
    fields: [
      'Monthly active users and OTP completion',
      'Created, started and completed trips',
      'Suggested plan reuse',
      'Hunter review and duplicate rates',
      'Game participation and verified wins',
      'Hazard and sharing consent events',
      'HP to RC conversions',
      'Voucher issuance and fulfillment',
      'Ad views, clicks and revenue',
      'Provider errors and support resolution'
    ],
    workflow: [
      'Choose date range',
      'Filter report category',
      'Review sample analytics',
      'Export authorized CSV'
    ],
    rules: ['Production charts must use real recorded data'],
    actions: [],
    records: [
      rec('RPT-001','User Growth','Admin','Users','Ready','All','Demo growth statistics'),
      rec('RPT-002','Hunter Quality','Admin','Hunter','Ready','All','Approval and duplicate reports'),
      rec('RPT-003','Game Performance','Admin','Games','Ready','All','Sessions and verified wins'),
      rec('RPT-004','Voucher Report','Admin','Rewards','Ready','All','Reservations and fulfillment'),
      rec('RPT-005','Advertisement Report','Admin','Ads','Ready','All','Views, clicks and revenue')
    ]
  },

  notifications: {
    title: 'Notifications',
    description: 'Operational alerts and approved announcements',
    fields: [
      'Notification title and message',
      'Audience and delivery category',
      'Trip and group updates',
      'Hunter verification notifications',
      'Game and reward notifications',
      'Security and safety messages',
      'Scheduled, sent and failed status',
      'Delivery history'
    ],
    workflow: [
      'Create announcement draft',
      'Select authorized recipients',
      'Review message',
      'Send using backend provider',
      'Monitor delivery status'
    ],
    rules: [
      'Respect consent and notification preferences',
      'Hotel promotional push notifications are excluded',
      'Demo send does not deliver real messages'
    ],
    actions: ['Mark Sent','Cancel'],
    records: [
      rec('NTF-001','Hunter Review Update','Hunters','Verification','Draft','All','Review result notification'),
      rec('NTF-002','Safety Advisory','Travellers','Safety','Draft','Jaffna','Operational notice'),
      rec('NTF-003','Reward Status','Wallet Users','Rewards','Sent','All','Demo sent status only')
    ]
  },

  'audit-logs': {
    title: 'Audit Logs',
    description: 'Administrative actions and protected decision history',
    fields: [
      'Audit event ID and timestamp',
      'Admin identity',
      'Target record',
      'Before and after states',
      'Decision reason',
      'Hunter and game approvals',
      'Wallet and voucher events',
      'Account warnings and suspensions',
      'Financial reconciliation changes'
    ],
    workflow: [
      'Filter audit events',
      'Inspect selected event',
      'Review authorized activity',
      'Export audit history'
    ],
    rules: [
      'Production audit storage must be tamper-evident',
      'Browser demo logs are not security evidence'
    ],
    actions: [],
    records: [
      rec('AUD-001','Demo Admin Login','Administrator','Security','Recorded','System','Local demo record')
    ]
  },

  settings: {
    title: 'Admin Settings',
    description: 'Security, roles, rewards and provider configuration',
    fields: [
      'Admin profile and account settings',
      'Password and session security',
      'Role-based permissions',
      'Reviewer authorization and escalation',
      'HP / RC owner-approved limits',
      'Voucher price and expiry configuration',
      'Game winner and reward policies',
      'GPS and media thresholds',
      'Google Maps and Cloudinary status',
      'AI, Weather, OTP and Push provider status',
      'Retention, backup and operational SLA'
    ],
    workflow: [
      'Review configuration',
      'Request authorized changes',
      'Apply approved settings through secure backend',
      'Audit changes'
    ],
    rules: [
      'Do not put API secrets in Angular',
      'Undecided production values need owner approval'
    ],
    actions: [],
    records: [
      rec('SET-001','Admin Security','Administrator','Security','Configured','System','Roles and authentication'),
      rec('SET-002','Reward Rules','Administrator','Finance','Review Required','System','100 HP = 10 RC reference'),
      rec('SET-003','Cloud Providers','Administrator','Integration','Not Connected','System','Cloudinary, Maps, Weather, AI')
    ]
  }
};
