/**
 * ┌──────────────────────────────────────────────────────────────┐
 *  Mock Database — In-memory data store for MSW handlers
 * └──────────────────────────────────────────────────────────────┘
 *
 * This file acts as a fake database. All data lives in memory
 * and resets every time you refresh the page.
 *
 * HOW IT WORKS:
 *   - Handlers import `leads` from here and read/write directly
 *   - Since it's just a JS array, push/splice/find all work
 *   - No persistence — perfect for development & testing
 *
 * ADDING NEW MOCK DATA:
 *   1. Define your interface here
 *   2. Create and export the array
 *   3. Import it in your handler file
 */

/* ── Types ── */

export type LeadSource = 'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Event';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Unqualified';

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  source: LeadSource;
  status: LeadStatus;
  score: number;
  assignedTo: string;
  createdDate: string;
  lastActivity: string;
}

/* ── Seed Data ── */

let leadId = 0;

export const leads: Lead[] = [
  { id: ++leadId, name: 'Arjun Mehta', email: 'arjun.mehta@techcorp.in', phone: '9876543210', company: 'TechCorp India', designation: 'CTO', source: 'LinkedIn', status: 'Qualified', score: 85, assignedTo: 'Sethupathy', createdDate: '19 Feb 2026', lastActivity: 'Today' },
  { id: ++leadId, name: 'Priya Sharma', email: 'priya.sharma@innovate.io', phone: '9123456780', company: 'Innovate Solutions', designation: 'VP Engineering', source: 'Website', status: 'Contacted', score: 62, assignedTo: 'Kumaran', createdDate: '18 Feb 2026', lastActivity: '1d ago' },
  { id: ++leadId, name: 'Rahul Verma', email: 'rahul.v@globalsoft.com', phone: '9988776655', company: 'GlobalSoft', designation: 'Product Manager', source: 'Referral', status: 'New', score: 40, assignedTo: '-', createdDate: '18 Feb 2026', lastActivity: '-' },
  { id: ++leadId, name: 'Sneha Iyer', email: 'sneha.iyer@cloudnine.in', phone: '8877665544', company: 'CloudNine Tech', designation: 'Head of IT', source: 'Event', status: 'Qualified', score: 78, assignedTo: 'Sethupathy', createdDate: '17 Feb 2026', lastActivity: '2d ago' },
  { id: ++leadId, name: 'Vikram Reddy', email: 'vikram.r@nexgen.co', phone: '7766554433', company: 'NexGen Systems', designation: 'Director', source: 'Cold Call', status: 'Contacted', score: 55, assignedTo: 'Lakshmi', createdDate: '16 Feb 2026', lastActivity: '3d ago' },
  { id: ++leadId, name: 'Deepa Nair', email: 'deepa.nair@sparkle.io', phone: '9654321870', company: 'Sparkle Digital', designation: 'CEO', source: 'LinkedIn', status: 'New', score: 30, assignedTo: '-', createdDate: '15 Feb 2026', lastActivity: '-' },
  { id: ++leadId, name: 'Karthik Rajan', email: 'karthik.r@byteworks.in', phone: '9012345678', company: 'ByteWorks', designation: 'Engineering Lead', source: 'Website', status: 'Unqualified', score: 15, assignedTo: 'Kumaran', createdDate: '14 Feb 2026', lastActivity: '5d ago' },
  { id: ++leadId, name: 'Ananya Das', email: 'ananya.d@pinnacle.com', phone: '8901234567', company: 'Pinnacle Corp', designation: 'VP Sales', source: 'Referral', status: 'Qualified', score: 90, assignedTo: 'Sethupathy', createdDate: '13 Feb 2026', lastActivity: 'Today' },
  { id: ++leadId, name: 'Rohan Kapoor', email: 'rohan.k@datavault.in', phone: '9871234560', company: 'DataVault', designation: 'Data Lead', source: 'Event', status: 'Contacted', score: 68, assignedTo: 'Lakshmi', createdDate: '12 Feb 2026', lastActivity: '4d ago' },
  { id: ++leadId, name: 'Meera Joshi', email: 'meera.j@agileflow.io', phone: '9786543210', company: 'AgileFlow', designation: 'Scrum Master', source: 'LinkedIn', status: 'New', score: 45, assignedTo: '-', createdDate: '11 Feb 2026', lastActivity: '-' },
  { id: ++leadId, name: 'Siddharth Rao', email: 'sid.rao@quantum.co', phone: '8765432109', company: 'Quantum Labs', designation: 'CTO', source: 'Cold Call', status: 'Qualified', score: 82, assignedTo: 'Sethupathy', createdDate: '10 Feb 2026', lastActivity: '1d ago' },
];
