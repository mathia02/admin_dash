export interface AdminRow {
  id: string;
  status: string;
  [key: string]: string;
}

export interface AdminColumn {
  key: string;
  label: string;
}

export interface AdminModuleDefinition {
  key: string;
  title: string;
  description: string;
  icon: string;
  columns: AdminColumn[];
  statuses: string[];
  rows: AdminRow[];
  workflow: string[];
}

function createModule(
  key: string,
  title: string,
  description: string,
  icon: string,
  columns: string[],
  statuses: string[],
  values: string[][],
  workflow: string[]
): AdminModuleDefinition {

  const rows: AdminRow[] = values.map((data, index) => {
    const row: AdminRow = {
      id: key.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3)
        + '-' + String(index + 1).padStart(3, '0'),
      status: data[columns.length] || statuses[0]
    };

    columns.forEach((_, i) => {
      row['c' + i] = data[i] || '';
    });

    return row;
  });

  return {
    key,
    title,
    description,
    icon,
    columns: columns.map((label, i) => ({
      key: 'c' + i,
      label
    })),
    statuses,
    rows,
    workflow
  };
}

export const MODULES: Record<string, AdminModuleDefinition> = {

  users: createModule(
    'users',
    'User Management',
    'View, search and manage registered WayHunter users.',
    '',
    ['Full Name', 'Email', 'Role', 'District', 'Joined'],
    ['Active', 'Warned', 'Suspended'],
    [
      ['Demo Traveler 01', 'traveler01@example.com', 'Traveler', 'Jaffna', '2026-10-21', 'Active'],
      ['Demo Hunter 02', 'hunter02@example.com', 'Hunter', 'Kandy', '2026-10-22', 'Active'],
      ['Demo Traveler 03', 'traveler03@example.com', 'Traveler', 'Colombo', '2026-10-23', 'Warned'],
      ['Demo Hunter 04', 'hunter04@example.com', 'Hunter', 'Galle', '2026-10-24', 'Active'],
      ['Demo Traveler 05', 'traveler05@example.com', 'Traveler', 'Nuwara Eliya', '2026-10-25', 'Suspended']
    ],
    ['Review user profile', 'Check contributions and reports', 'Warn, suspend or reactivate']
  ),

  'location-verification': createModule(
    'location-verification',
    'Location Verification',
    'Review hunter discoveries, GPS and supporting evidence.',
    '',
    ['Place', 'Hunter', 'District', 'Evidence', 'Submitted'],
    ['Pending', 'Approved', 'Rejected', 'More Evidence'],
    [
      ['Coastal Viewpoint', 'Demo Hunter 02', 'Jaffna', 'Photo + 360 Video', '2026-11-01', 'Pending'],
      ['Forest Trail Point', 'Demo Hunter 04', 'Kandy', 'Photo + GPS', '2026-11-02', 'More Evidence'],
      ['Heritage Landmark', 'Demo Hunter 02', 'Jaffna', 'Photo + 360 Video', '2026-11-03', 'Approved'],
      ['Lakeside Location', 'Demo Hunter 04', 'Nuwara Eliya', 'Photo + 360 Video', '2026-11-03', 'Pending']
    ],
    ['Review submitted evidence', 'Check duplicate and safety flags', 'Approve or request evidence']
  ),

  advertisements: createModule(
    'advertisements',
    'Advertisements',
    'Manage sponsored banners and promotional campaigns.',
    '',
    ['Campaign', 'Sponsor', 'Placement', 'Start Date', 'End Date'],
    ['Draft', 'Pending', 'Active', 'Paused', 'Completed'],
    [
      ['Travel Promotion A', 'Demo Sponsor A', 'Traveler Home', '2026-11-10', '2026-11-20', 'Active'],
      ['Hotel Campaign B', 'Demo Hotel B', 'Place Details', '2026-11-12', '2026-11-30', 'Pending'],
      ['Game Sponsor C', 'Demo Merchant C', 'Game Details', '2026-11-08', '2026-11-22', 'Draft']
    ],
    ['Create campaign', 'Set placement and schedule', 'Review performance']
  ),

  places: createModule(
    'places',
    'Places Management',
    'Manage published locations and travel information.',
    '',
    ['Place Name', 'District', 'Category', 'Source', 'Last Updated'],
    ['Published', 'Pending', 'Hidden', 'Rejected'],
    [
      ['Jaffna Fort', 'Jaffna', 'Heritage', 'Sample Place', '2026-11-01', 'Published'],
      ['Temple Viewpoint', 'Kandy', 'Culture', 'Sample Place', '2026-11-02', 'Published'],
      ['Coastal Discovery', 'Galle', 'Nature', 'Hunter Submission', '2026-11-03', 'Pending'],
      ['Forest Waterfall', 'Ratnapura', 'Nature', 'Sample Place', '2026-11-04', 'Published']
    ],
    ['Review place information', 'Check media and location', 'Publish or hide listing']
  ),

  'trips-historical-routes': createModule(
    'trips-historical-routes',
    'Trips & Historical Routes',
    'Inspect trip plans and reusable historical route segments.',
    '',
    ['Trip Name', 'Creator', 'Route', 'Travel Date', 'Stops'],
    ['Planned', 'Active', 'Completed', 'Flagged'],
    [
      ['Northern Explorer', 'Demo Traveler 01', 'Jaffna - Point Pedro', '2026-11-14', '5', 'Planned'],
      ['Hill Country Tour', 'Demo Traveler 03', 'Kandy - Ella', '2026-11-08', '7', 'Active'],
      ['Coastal Journey', 'Demo Traveler 05', 'Colombo - Galle', '2026-10-28', '4', 'Completed']
    ],
    ['Review planned trips', 'Inspect historical segments', 'Check flagged routes']
  ),

  hazards: createModule(
    'hazards',
    'Hazard Management',
    'Monitor reported travel hazards and route safety.',
    '',
    ['Hazard Type', 'Location', 'Severity', 'Reported By', 'Reported Date'],
    ['Reported', 'Verified', 'Resolved', 'Rejected'],
    [
      ['Fallen Tree', 'A9 Road - Sample', 'High', 'Demo Traveler 01', '2026-11-04', 'Reported'],
      ['Flooding', 'Kandy Road - Sample', 'High', 'Demo Traveler 03', '2026-11-04', 'Verified'],
      ['Road Obstruction', 'Galle - Sample', 'Medium', 'Demo Hunter 02', '2026-11-03', 'Resolved']
    ],
    ['Review hazard location and media', 'Assess affected route', 'Verify, reject or resolve']
  ),

  'group-trips': createModule(
    'group-trips',
    'Group Trips',
    'Monitor shared trips, membership and safety reports.',
    '',
    ['Group Name', 'Organizer', 'Members', 'Destination', 'Start Date'],
    ['Scheduled', 'Active', 'Completed', 'Flagged'],
    [
      ['Jaffna Explorer Group', 'Demo Traveler 01', '5', 'Jaffna', '2026-11-15', 'Scheduled'],
      ['Mountain Friends', 'Demo Traveler 03', '4', 'Ella', '2026-11-08', 'Active'],
      ['Weekend Explorers', 'Demo Traveler 05', '6', 'Galle', '2026-10-29', 'Completed']
    ],
    ['Review group activity', 'Check safety alerts', 'Inspect flagged trips']
  ),

  games: createModule(
    'games',
    'Games Management',
    'Review real-world games, hints, proofs and winners.',
    '',
    ['Game Name', 'Creator', 'District', 'Reward', 'End Date'],
    ['Pending', 'Active', 'Completed', 'Rejected'],
    [
      ['Mystery Heritage Hunt', 'Demo Traveler 01', 'Jaffna', '40 HP', '2026-11-15', 'Active'],
      ['Hidden Trail Game', 'Demo Hunter 02', 'Kandy', '30 HP', '2026-11-18', 'Pending'],
      ['Coastal Photo Hunt', 'Demo Traveler 03', 'Galle', '50 HP', '2026-11-10', 'Active'],
      ['Old City Challenge', 'Demo Hunter 04', 'Colombo', '25 HP', '2026-11-01', 'Completed']
    ],
    ['Review game creation', 'Check proof and anti-cheat flags', 'Monitor game results']
  ),

  'wallet-rewards': createModule(
    'wallet-rewards',
    'Wallet & Rewards',
    'Monitor HP, RC, voucher requests and redemptions.',
    '',
    ['User', 'Transaction Type', 'Amount', 'Reward / Merchant', 'Requested'],
    ['Pending', 'Approved', 'Rejected', 'Issued', 'Redeemed'],
    [
      ['Demo Traveler 01', 'Voucher Redemption', '150 RC', 'Demo Restaurant Voucher', '2026-11-04', 'Pending'],
      ['Demo Hunter 02', 'Reward Credit', '40 HP', 'Approved Discovery', '2026-11-03', 'Approved'],
      ['Demo Traveler 03', 'Voucher Redemption', '200 RC', 'Demo Shopping Voucher', '2026-11-02', 'Issued'],
      ['Demo Traveler 05', 'Voucher Redemption', '100 RC', 'Demo Food Voucher', '2026-11-01', 'Redeemed']
    ],
    ['Review ledger and eligibility', 'Approve redemption request', 'Track voucher issuance']
  ),

  merchants: createModule(
    'merchants',
    'Merchant Management',
    'Manage partner profiles, offers and settlement records.',
    '',
    ['Merchant', 'Category', 'District', 'Contact', 'Offers'],
    ['Pending', 'Approved', 'Suspended', 'Rejected'],
    [
      ['Demo Hotel A', 'Hotel', 'Jaffna', 'hotel@example.com', '3', 'Approved'],
      ['Demo Restaurant B', 'Food', 'Kandy', 'food@example.com', '2', 'Pending'],
      ['Demo Store C', 'Shopping', 'Colombo', 'store@example.com', '5', 'Approved']
    ],
    ['Review merchant application', 'Manage partner offers', 'Monitor rewards and settlements']
  ),

  'reports-analytics': createModule(
    'reports-analytics',
    'Reports & Analytics',
    'Explore platform performance and demo reports.',
    '',
    ['Report', 'Module', 'Period', 'Created By', 'Generated Date'],
    ['Ready', 'Processing', 'Archived'],
    [
      ['Users Summary', 'Users', 'Monthly', 'Demo Admin', '2026-11-01', 'Ready'],
      ['Game Performance', 'Games', 'Weekly', 'Demo Admin', '2026-11-03', 'Ready'],
      ['Reward Transactions', 'Wallet', 'Monthly', 'Demo Admin', '2026-11-04', 'Processing'],
      ['Locations Overview', 'Places', 'Weekly', 'Demo Admin', '2026-11-04', 'Ready']
    ],
    ['Review key performance metrics', 'Filter records by period', 'Export demo data to CSV']
  )

};
