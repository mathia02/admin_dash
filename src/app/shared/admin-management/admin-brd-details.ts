export interface AdminBrdSection {
  heading: string;
  fields: string[];
  workflow: string[];
  rules: string[];
}

export interface AdminBrdModule {
  overview: string;
  sections: AdminBrdSection[];
}

export const ADMIN_BRD: Record<string, AdminBrdModule> = {

  users: {
    overview: 'Registered accounts, contributions and moderation.',
    sections: [
      {
        heading: 'User Profile Information',
        fields: [
          'User ID and display name',
          'Email and contact details',
          'Registration date',
          'Account status',
          'Public or private profile setting',
          'Authorized account details'
        ],
        workflow: [
          'Search or filter users',
          'Open selected user profile',
          'Review authorized account information'
        ],
        rules: ['Protect private personal information']
      },
      {
        heading: 'User Contributions',
        fields: [
          'Created and completed trips',
          'Hunter discovery submissions',
          'Games created and played',
          'Verified wins and contributions',
          'HP and RC transaction references',
          'User reports and moderation history'
        ],
        workflow: [
          'Inspect contribution history',
          'Review flagged activity'
        ],
        rules: ['Do not expose restricted wallet details publicly']
      },
      {
        heading: 'Account Moderation',
        fields: [
          'Warnings',
          'Suspension reason',
          'Current moderation status',
          'Decision timestamp',
          'Responsible admin'
        ],
        workflow: [
          'Review reports',
          'Warn or suspend when authorized',
          'Reactivate after review',
          'Record administrative decision'
        ],
        rules: ['Role-based authorization and audit required']
      }
    ]
  },

  'location-verification': {
    overview: 'Authorized Hunter discovery verification.',
    sections: [
      {
        heading: 'Submitted Place Details',
        fields: [
          'Discovery ID',
          'Hunter user ID',
          'Place name and description',
          'Current district',
          'GPS latitude and longitude',
          'GPS accuracy and timestamp',
          'Submission date and status'
        ],
        workflow: [
          'Open pending submission',
          'Inspect place and district information'
        ],
        rules: ['Only current-district submissions are eligible']
      },
      {
        heading: 'Live Capture Evidence',
        fields: [
          'Guided 360 video evidence',
          'Live normal photo evidence',
          'Capture timestamps',
          'GPS linked capture session',
          'Protected media references'
        ],
        workflow: [
          'Review protected 360 video',
          'Review normal photo',
          'Check evidence consistency'
        ],
        rules: [
          'Hunter proof must be captured live',
          'Gallery proof is not allowed'
        ]
      },
      {
        heading: '200m Duplicate Screening',
        fields: [
          'Nearby candidate places within 200m',
          'Candidate distances',
          'Place name similarity',
          'Normal photo comparison',
          'Possible duplicate or unknown status'
        ],
        workflow: [
          'Review nearby candidates',
          'Compare available evidence',
          'Escalate uncertain cases'
        ],
        rules: [
          'Distance alone cannot conclusively prove a duplicate'
        ]
      },
      {
        heading: 'Verification Decision',
        fields: [
          'Pending / Under Review / Approved / Rejected',
          'Reviewer notes and rejection reason',
          'Publication status',
          'Eligible reward status',
          'Decision audit reference'
        ],
        workflow: [
          'Make authorized decision',
          'Publish approved eligible place',
          'Credit eligible reward once through backend'
        ],
        rules: [
          'No automatic publication',
          'No RC award while pending'
        ]
      }
    ]
  },

  advertisements: {
    overview: 'Sponsored content and campaign management.',
    sections: [
      {
        heading: 'Campaign Setup',
        fields: [
          'Campaign ID and title',
          'Advertiser or sponsor',
          'Banner image and destination',
          'Home banner placement',
          'Sponsored hotel or restaurant place',
          'Sponsored game placement',
          'Start date and end date',
          'Campaign status'
        ],
        workflow: [
          'Create campaign',
          'Choose placement',
          'Schedule and review',
          'Activate, pause or end'
        ],
        rules: ['Sponsored content must be clearly disclosed']
      },
      {
        heading: 'Performance and Revenue',
        fields: [
          'Impressions or views',
          'Clicks',
          'Click-through rate',
          'Campaign charges',
          'Approved revenue records',
          'Report period'
        ],
        workflow: [
          'Review performance',
          'Compare campaign results',
          'Export campaign report'
        ],
        rules: [
          'Paid promotion does not bypass place or game verification'
        ]
      }
    ]
  },

  places: {
    overview: 'Published places and content moderation.',
    sections: [
      {
        heading: 'Place Catalogue',
        fields: [
          'Place ID and name',
          'Description and category',
          'District and coordinates',
          'Public photos',
          'Hunter attribution',
          'Verification status',
          'Published or hidden status'
        ],
        workflow: [
          'Search and filter places',
          'Open place details',
          'Review authorized changes',
          'Publish or hide through approved workflow'
        ],
        rules: [
          'Only approved places can be published',
          'Protect private Hunter evidence'
        ]
      },
      {
        heading: 'Content Reports',
        fields: [
          'Incorrect information reports',
          'Moderation notes',
          'Visibility changes',
          'Decision history'
        ],
        workflow: ['Investigate reports', 'Record moderation decision'],
        rules: ['Maintain an admin decision audit']
      }
    ]
  },

  trips: {
    overview: 'Trip creation, completion and authorized route oversight.',
    sections: [
      {
        heading: 'Trip Information',
        fields: [
          'Trip ID and name',
          'Trip creator',
          'Start and end dates',
          'Start location, stops and end location',
          'Budget and vehicle',
          'Headcount',
          'Created / Active / Completed status',
          'Suggested or AI-assisted plan reference'
        ],
        workflow: [
          'Filter trips by status',
          'View permitted trip summary',
          'Review trip completion'
        ],
        rules: ['Respect trip privacy and owner permissions']
      },
      {
        heading: 'Routes and Usage Reports',
        fields: [
          'Trip route information when available',
          'Trip completion history',
          'Suggested plan reuse',
          'Trip participant count',
          'Relevant incident reports'
        ],
        workflow: [
          'Review permitted route data',
          'Generate trip usage statistics'
        ],
        rules: [
          'Do not fabricate missing routes',
          'Do not provide unrestricted live location monitoring'
        ]
      }
    ]
  },

  hazards: {
    overview: 'Community hazard reporting and investigation.',
    sections: [
      {
        heading: 'Hazard Information',
        fields: [
          'Hazard ID',
          'Reporter reference',
          'Category and description',
          'GPS and timestamp',
          'Photo or video reference',
          'Community unverified label',
          'Report status'
        ],
        workflow: [
          'View report',
          'Inspect available evidence',
          'Investigate and update moderation status'
        ],
        rules: [
          'Routine photo approval is not required before submission',
          'Community hazards are not authoritative emergency advice'
        ]
      },
      {
        heading: 'Incident Management',
        fields: [
          'Repeated incident reports',
          'Investigation status',
          'Resolution notes',
          'Safety notification references'
        ],
        workflow: [
          'Investigate',
          'Resolve or dismiss with reason',
          'Record action history'
        ],
        rules: ['Do not claim automatic hazard verification']
      }
    ]
  },

  'group-trips': {
    overview: 'Trip group membership and consent-related issues.',
    sections: [
      {
        heading: 'Group Information',
        fields: [
          'Group or trip ID',
          'Trip organizer',
          'Invited users',
          'Pending invitations',
          'Accepted and declined invitations',
          'Participant count'
        ],
        workflow: [
          'View authorized group summary',
          'Investigate membership complaints'
        ],
        rules: [
          'Accepted invitation does not automatically grant GPS sharing'
        ]
      },
      {
        heading: 'Sharing and Privacy',
        fields: [
          'Location-sharing consent status',
          'Live / Paused / Offline state',
          'Revoked consent records',
          'Sharing issue reports'
        ],
        workflow: [
          'Review sharing incidents',
          'Record resolution'
        ],
        rules: [
          'Live sharing needs explicit individual opt-in',
          'Sharing stops when trip ends or consent is revoked'
        ]
      }
    ]
  },

  games: {
    overview: 'Created games, publication and proof governance.',
    sections: [
      {
        heading: 'Game Submission',
        fields: [
          'Game ID and title',
          'Creator ID',
          'Description and cover photo',
          'Photo-based clues',
          'Text hints',
          'Stage count and order',
          'Time limit',
          'Configured RC reward',
          'Draft / Pending / Published status'
        ],
        workflow: [
          'Open submitted game',
          'Review stages and hints',
          'Approve or reject publication'
        ],
        rules: [
          'No required map or distance hint',
          'Games cannot automatically publish'
        ]
      },
      {
        heading: 'Player Verification',
        fields: [
          'Game session ID',
          'Live camera proof reference',
          'Stage verification status',
          'Time expiry',
          'Suspicious proof flags',
          'Appeals',
          'Confirmed results and winners'
        ],
        workflow: [
          'Investigate flagged proof',
          'Review eligible result',
          'Escalate uncertain cases'
        ],
        rules: [
          'Player proof must use live capture',
          'Only eligible verified winner can earn reward',
          'No double reward credit'
        ]
      }
    ]
  },

  'wallet-rewards': {
    overview: 'HP, RC, voucher request and auditable ledger operations.',
    sections: [
      {
        heading: 'Wallet Overview',
        fields: [
          'Wallet owner reference',
          'Spendable HP',
          'Lifetime HP',
          'Available RC',
          'Reserved RC',
          'Earned and spent RC',
          'Transaction references'
        ],
        workflow: [
          'Review authorized wallet',
          'Inspect ledger records',
          'Investigate anomalies'
        ],
        rules: [
          '100 HP = 10 RC',
          '100 RC = LKR 10 internal reference only',
          'No direct cash-out',
          'Lifetime HP does not decrease on exchange'
        ]
      },
      {
        heading: 'Redemption Requests',
        fields: [
          'Request ID and user',
          'Partner offer',
          'Actual voucher RC price',
          'Reserved RC',
          'Pending / Under Review / Approved / Rejected',
          'Fulfillment status'
        ],
        workflow: [
          'Check eligibility and stock',
          'Review request',
          'Approve or reject through backend',
          'Allocate voucher after verification'
        ],
        rules: [
          'Minimum redemption eligibility: 100 RC',
          'Request must also meet actual voucher price',
          'Rejection releases reserved RC',
          'Atomic ledger and stock updates required'
        ]
      }
    ]
  },

  merchants: {
    overview: 'Partner-assisted voucher inventory and fulfillment.',
    sections: [
      {
        heading: 'Merchant / Partner Records',
        fields: [
          'Partner ID and business name',
          'Contact reference',
          'Contract terms',
          'Commission or margin',
          'Settlement information',
          'Partner status'
        ],
        workflow: [
          'Register partner details',
          'Review approved contract terms',
          'Track partner settlement'
        ],
        rules: [
          'A separate merchant website is not required initially'
        ]
      },
      {
        heading: 'Voucher Inventory',
        fields: [
          'Voucher ID and offer title',
          'Physical or digital voucher',
          'Partner-specific RC price',
          'Available and reserved stock',
          'Expiry and usage terms',
          'Assigned voucher reference',
          'Available / Used / Expired status'
        ],
        workflow: [
          'Import stock',
          'Verify redemption request',
          'Allocate voucher once',
          'Reconcile usage and expiry'
        ],
        rules: [
          'Only valid contracted offers can be fulfilled',
          'Protect voucher codes',
          'Never allocate the same stock twice'
        ]
      }
    ]
  },

  reports: {
    overview: 'KPIs, engagement, operations and commercial analytics.',
    sections: [
      {
        heading: 'User and Travel Analytics',
        fields: [
          'Monthly active users',
          'Verified registrations',
          'OTP completion',
          'Created trips',
          'Started trips',
          'Completed trips',
          'Suggested plan reuse'
        ],
        workflow: ['Choose report period', 'Review KPIs', 'Export results'],
        rules: ['Use actual API-derived statistics in production']
      },
      {
        heading: 'Hunter, Game and Safety Analytics',
        fields: [
          'Published eligible discoveries',
          'Duplicate candidates',
          'Review turnaround',
          'Rejected rate',
          'Game sessions and verified wins',
          'Suspicious proof rate',
          'Hazard and group consent events'
        ],
        workflow: ['Filter report category', 'Analyze trend'],
        rules: ['Unverified claims must not count as verified awards']
      },
      {
        heading: 'Commerce and Platform Reports',
        fields: [
          'HP to RC conversions',
          'RC holds and releases',
          'Voucher stock and fulfillment',
          'Used versus expired vouchers',
          'Advertisement and sponsor revenue',
          'Partner settlements',
          'API errors and upload failures',
          'Support resolution'
        ],
        workflow: [
          'Review commercial records',
          'Reconcile differences',
          'Export report'
        ],
        rules: ['Figures must reconcile to authoritative records']
      }
    ]
  },

  notifications: {
    overview: 'Approved operational alerts and announcements.',
    sections: [
      {
        heading: 'Notification Templates',
        fields: [
          'Notification ID',
          'Title and message',
          'Audience',
          'Trip and group notifications',
          'Hunter review updates',
          'Game result updates',
          'Reward and voucher status',
          'Social and security notices',
          'Safety announcements'
        ],
        workflow: [
          'Prepare notification',
          'Review target audience',
          'Approve operational message',
          'Send through configured provider'
        ],
        rules: [
          'Respect user notification preferences',
          'Hotel promotional push notifications are out of initial scope'
        ]
      },
      {
        heading: 'Delivery History',
        fields: [
          'Created date',
          'Delivery state',
          'Failed delivery details',
          'Authorized sender'
        ],
        workflow: ['Monitor delivery', 'Review failures'],
        rules: ['Do not display Sent unless provider confirms delivery action']
      }
    ]
  },

  'audit-logs': {
    overview: 'Protected history of admin and financial actions.',
    sections: [
      {
        heading: 'Administrative Activity',
        fields: [
          'Audit event ID',
          'Admin identity',
          'Action type',
          'Target record ID',
          'Previous and new state',
          'Timestamp',
          'Decision reason'
        ],
        workflow: [
          'Search audit events',
          'Filter by date and category',
          'Review authorized history'
        ],
        rules: ['Audit records must be tamper-evident in production']
      },
      {
        heading: 'Financial and Publication Events',
        fields: [
          'Hunter approval decisions',
          'Game publication decisions',
          'HP/RC corrections',
          'Voucher allocation events',
          'Voucher settlement changes',
          'Account moderation'
        ],
        workflow: ['Investigate events', 'Export authorized reports'],
        rules: [
          'Frontend browser storage is not a secure production audit log'
        ]
      }
    ]
  },

  settings: {
    overview: 'Platform administration and controlled configuration.',
    sections: [
      {
        heading: 'Admin Account and Security',
        fields: [
          'Admin profile',
          'Password and session security',
          'Admin roles',
          'Reviewer permissions',
          'Access and audit policies'
        ],
        workflow: ['Review settings', 'Authorize changes'],
        rules: ['Permissions must be enforced on the backend']
      },
      {
        heading: 'Rewards and Verification Rules',
        fields: [
          'Hunter earn limits',
          'Game rewards and winner mode',
          'Daily earn caps',
          'Voucher limits and expiry',
          'GPS accuracy threshold',
          'Media restrictions',
          'Duplicate review policy',
          'Reviewer escalation workflow'
        ],
        workflow: [
          'Review owner-approved parameters',
          'Update controlled configuration'
        ],
        rules: ['Do not invent undecided production parameters']
      },
      {
        heading: 'Provider and System Configuration',
        fields: [
          'Google Maps and Routes',
          'Cloudinary media storage',
          'Weather service',
          'External AI Trip API',
          'OTP and push providers',
          'Operational SLA',
          'Retention and recovery policy'
        ],
        workflow: [
          'Check integration status',
          'Review security and availability'
        ],
        rules: [
          'Never expose provider secrets in frontend configuration'
        ]
      }
    ]
  }
};
