// ---------------------------------------------------------------------------
// Application data for Parcel Intel.
// Everything the UI renders is derived from this single file so the whole
// dashboard can be re-pointed at a real API later without touching the UI.
// ---------------------------------------------------------------------------

export type LeadStatus =
  | "New Lead"
  | "Contacted"
  | "Under Review"
  | "Hot Lead"
  | "Under Contract"
  | "Closed";

export type PropertyType =
  | "Single Family"
  | "Multi-Family"
  | "Condo"
  | "Townhouse"
  | "Vacant Land";

export interface Property {
  id: string;
  parcelId: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  estValue: number;
  lastSalePrice: number;
  lastSaleDate: string;
  ownerOccupied: boolean;
  opportunityScore: number; // 0-100
  status: LeadStatus;
  leadSource: string;
  ownerId: string;
  tags: string[];
  lastActivity: string; // ISO date
}

export type OwnerType = "Individual" | "LLC" | "Trust" | "Estate";

export interface Owner {
  id: string;
  name: string;
  type: OwnerType;
  mailingAddress: string;
  phone: string;
  email: string;
  portfolioValue: number;
  propertyIds: string[];
  dataQuality: number; // 0-100 confidence
  contactStatus: "Verified" | "Unverified" | "Skip-Traced" | "Bounced";
  notes: string;
}

export type ActivityType = "Call" | "Email" | "SMS" | "Note" | "Status Change" | "Skip Trace";

export interface Activity {
  id: string;
  propertyId: string;
  ownerId: string;
  type: ActivityType;
  summary: string;
  user: string;
  date: string; // ISO date
}

export interface SourceTraceEntry {
  id: string;
  propertyId: string;
  source: string;
  method: string;
  confidence: number;
  capturedAt: string;
}

// ---------------------------------------------------------------------------
// Owners
// ---------------------------------------------------------------------------

export const owners: Owner[] = [
  {
    id: "own-01",
    name: "Marguerite Okafor",
    type: "Individual",
    mailingAddress: "12 Birchwood Ln, White Plains, NY 10605",
    phone: "(914) 555-0142",
    email: "m.okafor@fastmail.com",
    portfolioValue: 612000,
    propertyIds: ["prop-01"],
    dataQuality: 92,
    contactStatus: "Verified",
    notes: "Inherited property from parent estate in 2019. Open to a cash offer if timeline is under 30 days.",
  },
  {
    id: "own-02",
    name: "Harbor Point Holdings LLC",
    type: "LLC",
    mailingAddress: "88 Mamaroneck Ave Ste 400, White Plains, NY 10601",
    phone: "(914) 555-0199",
    email: "acquisitions@harborpointholdings.com",
    portfolioValue: 3140000,
    propertyIds: ["prop-02", "prop-09", "prop-14"],
    dataQuality: 88,
    contactStatus: "Verified",
    notes: "Small local investment group, actively liquidating two out-of-state assets to fund a Rye project.",
  },
  {
    id: "own-03",
    name: "Desmond & Rita Falk",
    type: "Individual",
    mailingAddress: "204 Elmsford Rd, Elmsford, NY 10523",
    phone: "(914) 555-0177",
    email: "dfalk88@gmail.com",
    portfolioValue: 455000,
    propertyIds: ["prop-03"],
    dataQuality: 74,
    contactStatus: "Skip-Traced",
    notes: "Mail returned twice. Cell number found via skip trace, not yet confirmed live.",
  },
  {
    id: "own-04",
    name: "The Petrakis Family Trust",
    type: "Trust",
    mailingAddress: "16 Quarry Hollow, Yonkers, NY 10710",
    phone: "(914) 555-0163",
    email: "trustee@petrakisfamily.org",
    portfolioValue: 890000,
    propertyIds: ["prop-04"],
    dataQuality: 81,
    contactStatus: "Verified",
    notes: "Trustee is the late owner's daughter. Property vacant since March, taxes current.",
  },
  {
    id: "own-05",
    name: "Antoine Reyes",
    type: "Individual",
    mailingAddress: "77 Sunset Terrace, Yonkers, NY 10705",
    phone: "(914) 555-0118",
    email: "areyes.home@gmail.com",
    portfolioValue: 398000,
    propertyIds: ["prop-05"],
    dataQuality: 65,
    contactStatus: "Unverified",
    notes: "No response to first outreach. Phone number confidence is medium.",
  },
  {
    id: "own-06",
    name: "Bluewater Rentals LLC",
    type: "LLC",
    mailingAddress: "410 Boston Post Rd, Rye, NY 10580",
    phone: "(914) 555-0205",
    email: "info@bluewaterrentalsny.com",
    portfolioValue: 2210000,
    propertyIds: ["prop-06", "prop-11"],
    dataQuality: 90,
    contactStatus: "Verified",
    notes: "Landlord group, receptive to off-market offers on underperforming units.",
  },
  {
    id: "own-07",
    name: "Estate of Walter Higby",
    type: "Estate",
    mailingAddress: "9 Pinecrest Ct, Scarsdale, NY 10583",
    phone: "(914) 555-0134",
    email: "executor.higby@lawfirmny.com",
    portfolioValue: 715000,
    propertyIds: ["prop-07"],
    dataQuality: 70,
    contactStatus: "Verified",
    notes: "Probate closed last month. Executor is motivated to settle before year end.",
  },
  {
    id: "own-08",
    name: "Priya & Sanjay Deshmukh",
    type: "Individual",
    mailingAddress: "541 Ridge Rd, Hartsdale, NY 10530",
    phone: "(914) 555-0189",
    email: "pdeshmukh@outlook.com",
    portfolioValue: 522000,
    propertyIds: ["prop-08"],
    dataQuality: 84,
    contactStatus: "Verified",
    notes: "Relocating out of state in Q4, prefer a quick closing over top dollar.",
  },
  {
    id: "own-09",
    name: "Cornerstone Capital Partners",
    type: "LLC",
    mailingAddress: "1 Grand Central Pl, New York, NY 10017",
    phone: "(212) 555-0161",
    email: "deals@cornerstonecap.com",
    portfolioValue: 5460000,
    propertyIds: ["prop-10", "prop-13"],
    dataQuality: 95,
    contactStatus: "Verified",
    notes: "Institutional buyer and occasional seller. Fast to respond, needs formal LOI.",
  },
  {
    id: "own-10",
    name: "Ines Carvalho",
    type: "Individual",
    mailingAddress: "23 Wynwood Dr, Mount Vernon, NY 10552",
    phone: "(914) 555-0147",
    email: "ines.carvalho77@gmail.com",
    portfolioValue: 361000,
    propertyIds: ["prop-12"],
    dataQuality: 58,
    contactStatus: "Bounced",
    notes: "Email bounced, mailing address may be outdated. Needs re-skip.",
  },
];

// ---------------------------------------------------------------------------
// Properties
// ---------------------------------------------------------------------------

export const properties: Property[] = [
  {
    id: "prop-01",
    parcelId: "APN-6604-112-009",
    address: "12 Birchwood Ln",
    city: "White Plains",
    state: "NY",
    zip: "10605",
    propertyType: "Single Family",
    beds: 4,
    baths: 2.5,
    sqft: 2380,
    yearBuilt: 1968,
    estValue: 685000,
    lastSalePrice: 210000,
    lastSaleDate: "1994-06-11",
    ownerOccupied: false,
    opportunityScore: 91,
    status: "Hot Lead",
    leadSource: "Probate Filing",
    ownerId: "own-01",
    tags: ["inherited", "high-equity", "vacant-signal"],
    lastActivity: "2026-07-08",
  },
  {
    id: "prop-02",
    parcelId: "APN-6601-098-004",
    address: "245 Mamaroneck Ave",
    city: "White Plains",
    state: "NY",
    zip: "10605",
    propertyType: "Multi-Family",
    beds: 6,
    baths: 3,
    sqft: 4100,
    yearBuilt: 1955,
    estValue: 1180000,
    lastSalePrice: 640000,
    lastSaleDate: "2016-03-22",
    ownerOccupied: false,
    opportunityScore: 76,
    status: "Contacted",
    leadSource: "Tax Delinquent List",
    ownerId: "own-02",
    tags: ["multi-unit", "out-of-state-owner"],
    lastActivity: "2026-07-05",
  },
  {
    id: "prop-03",
    parcelId: "APN-6512-044-021",
    address: "204 Elmsford Rd",
    city: "Elmsford",
    state: "NY",
    zip: "10523",
    propertyType: "Single Family",
    beds: 3,
    baths: 1.5,
    sqft: 1620,
    yearBuilt: 1971,
    estValue: 512000,
    lastSalePrice: 289000,
    lastSaleDate: "2005-09-01",
    ownerOccupied: true,
    opportunityScore: 58,
    status: "New Lead",
    leadSource: "Code Violation",
    ownerId: "own-03",
    tags: ["deferred-maintenance"],
    lastActivity: "2026-06-29",
  },
  {
    id: "prop-04",
    parcelId: "APN-6788-201-017",
    address: "16 Quarry Hollow",
    city: "Yonkers",
    state: "NY",
    zip: "10710",
    propertyType: "Single Family",
    beds: 3,
    baths: 2,
    sqft: 1890,
    yearBuilt: 1962,
    estValue: 559000,
    lastSalePrice: 175000,
    lastSaleDate: "1988-04-14",
    ownerOccupied: false,
    opportunityScore: 84,
    status: "Under Review",
    leadSource: "Trust Filing",
    ownerId: "own-04",
    tags: ["vacant", "trust-owned", "high-equity"],
    lastActivity: "2026-07-07",
  },
  {
    id: "prop-05",
    parcelId: "APN-6790-330-002",
    address: "77 Sunset Terrace",
    city: "Yonkers",
    state: "NY",
    zip: "10705",
    propertyType: "Condo",
    beds: 2,
    baths: 1,
    sqft: 980,
    yearBuilt: 1998,
    estValue: 312000,
    lastSalePrice: 245000,
    lastSaleDate: "2012-11-30",
    ownerOccupied: true,
    opportunityScore: 41,
    status: "New Lead",
    leadSource: "Pre-Foreclosure",
    ownerId: "own-05",
    tags: ["pre-foreclosure"],
    lastActivity: "2026-06-20",
  },
  {
    id: "prop-06",
    parcelId: "APN-6710-078-011",
    address: "410 Boston Post Rd",
    city: "Rye",
    state: "NY",
    zip: "10580",
    propertyType: "Multi-Family",
    beds: 8,
    baths: 4,
    sqft: 5200,
    yearBuilt: 1949,
    estValue: 1640000,
    lastSalePrice: 980000,
    lastSaleDate: "2018-01-19",
    ownerOccupied: false,
    opportunityScore: 69,
    status: "Contacted",
    leadSource: "Direct Mail Reply",
    ownerId: "own-06",
    tags: ["landlord-portfolio"],
    lastActivity: "2026-07-02",
  },
  {
    id: "prop-07",
    parcelId: "APN-6655-119-006",
    address: "9 Pinecrest Ct",
    city: "Scarsdale",
    state: "NY",
    zip: "10583",
    propertyType: "Single Family",
    beds: 5,
    baths: 3.5,
    sqft: 3420,
    yearBuilt: 1975,
    estValue: 1120000,
    lastSalePrice: 340000,
    lastSaleDate: "1999-08-05",
    ownerOccupied: false,
    opportunityScore: 88,
    status: "Hot Lead",
    leadSource: "Probate Filing",
    ownerId: "own-07",
    tags: ["probate-closed", "high-equity", "vacant-signal"],
    lastActivity: "2026-07-09",
  },
  {
    id: "prop-08",
    parcelId: "APN-6499-205-013",
    address: "541 Ridge Rd",
    city: "Hartsdale",
    state: "NY",
    zip: "10530",
    propertyType: "Single Family",
    beds: 4,
    baths: 2,
    sqft: 2140,
    yearBuilt: 1988,
    estValue: 640000,
    lastSalePrice: 402000,
    lastSaleDate: "2009-05-27",
    ownerOccupied: true,
    opportunityScore: 63,
    status: "Under Review",
    leadSource: "Relocation Signal",
    ownerId: "own-08",
    tags: ["relocating", "motivated"],
    lastActivity: "2026-07-01",
  },
  {
    id: "prop-09",
    parcelId: "APN-6601-098-018",
    address: "260 Mamaroneck Ave",
    city: "White Plains",
    state: "NY",
    zip: "10605",
    propertyType: "Multi-Family",
    beds: 6,
    baths: 3,
    sqft: 3980,
    yearBuilt: 1958,
    estValue: 1095000,
    lastSalePrice: 590000,
    lastSaleDate: "2016-03-22",
    ownerOccupied: false,
    opportunityScore: 72,
    status: "Contacted",
    leadSource: "Tax Delinquent List",
    ownerId: "own-02",
    tags: ["multi-unit", "out-of-state-owner"],
    lastActivity: "2026-06-27",
  },
  {
    id: "prop-10",
    parcelId: "APN-6222-410-002",
    address: "88 Harborview Dr",
    city: "New Rochelle",
    state: "NY",
    zip: "10801",
    propertyType: "Townhouse",
    beds: 3,
    baths: 2.5,
    sqft: 1980,
    yearBuilt: 2004,
    estValue: 728000,
    lastSalePrice: 615000,
    lastSaleDate: "2019-07-16",
    ownerOccupied: false,
    opportunityScore: 54,
    status: "New Lead",
    leadSource: "MLS Expired",
    ownerId: "own-09",
    tags: ["expired-listing"],
    lastActivity: "2026-06-18",
  },
  {
    id: "prop-11",
    parcelId: "APN-6710-078-024",
    address: "418 Boston Post Rd",
    city: "Rye",
    state: "NY",
    zip: "10580",
    propertyType: "Multi-Family",
    beds: 4,
    baths: 2,
    sqft: 2600,
    yearBuilt: 1951,
    estValue: 890000,
    lastSalePrice: 520000,
    lastSaleDate: "2018-01-19",
    ownerOccupied: false,
    opportunityScore: 61,
    status: "Contacted",
    leadSource: "Direct Mail Reply",
    ownerId: "own-06",
    tags: ["landlord-portfolio"],
    lastActivity: "2026-06-24",
  },
  {
    id: "prop-12",
    parcelId: "APN-6910-500-031",
    address: "23 Wynwood Dr",
    city: "Mount Vernon",
    state: "NY",
    zip: "10552",
    propertyType: "Single Family",
    beds: 3,
    baths: 1,
    sqft: 1440,
    yearBuilt: 1954,
    estValue: 468000,
    lastSalePrice: 168000,
    lastSaleDate: "2001-02-08",
    ownerOccupied: true,
    opportunityScore: 47,
    status: "New Lead",
    leadSource: "Code Violation",
    ownerId: "own-10",
    tags: ["deferred-maintenance", "bad-contact-data"],
    lastActivity: "2026-06-15",
  },
  {
    id: "prop-13",
    parcelId: "APN-6222-410-019",
    address: "94 Harborview Dr",
    city: "New Rochelle",
    state: "NY",
    zip: "10801",
    propertyType: "Townhouse",
    beds: 3,
    baths: 2.5,
    sqft: 2010,
    yearBuilt: 2004,
    estValue: 741000,
    lastSalePrice: 622000,
    lastSaleDate: "2019-09-02",
    ownerOccupied: false,
    opportunityScore: 49,
    status: "New Lead",
    leadSource: "MLS Expired",
    ownerId: "own-09",
    tags: ["expired-listing"],
    lastActivity: "2026-06-12",
  },
  {
    id: "prop-14",
    parcelId: "APN-6601-101-007",
    address: "301 Mamaroneck Ave",
    city: "White Plains",
    state: "NY",
    zip: "10605",
    propertyType: "Vacant Land",
    beds: 0,
    baths: 0,
    sqft: 0,
    yearBuilt: 0,
    estValue: 285000,
    lastSalePrice: 95000,
    lastSaleDate: "2010-10-10",
    ownerOccupied: false,
    opportunityScore: 66,
    status: "Under Review",
    leadSource: "Tax Delinquent List",
    ownerId: "own-02",
    tags: ["vacant-land", "out-of-state-owner"],
    lastActivity: "2026-06-30",
  },
];

// ---------------------------------------------------------------------------
// CRM Activity Timeline
// ---------------------------------------------------------------------------

export const activities: Activity[] = [
  { id: "act-01", propertyId: "prop-01", ownerId: "own-01", type: "Call", summary: "Spoke with Marguerite, confirmed she inherited the property and is open to offers.", user: "B. Mohammed", date: "2026-07-08" },
  { id: "act-02", propertyId: "prop-01", ownerId: "own-01", type: "Status Change", summary: "Moved from Contacted to Hot Lead after positive call.", user: "System", date: "2026-07-08" },
  { id: "act-03", propertyId: "prop-07", ownerId: "own-07", type: "Email", summary: "Sent probate outreach letter, no reply yet.", user: "B. Mohammed", date: "2026-07-06" },
  { id: "act-04", propertyId: "prop-07", ownerId: "own-07", type: "Call", summary: "Executor confirmed probate closed, wants to sell before year end.", user: "B. Mohammed", date: "2026-07-09" },
  { id: "act-05", propertyId: "prop-02", ownerId: "own-02", type: "SMS", summary: "Text sent to acquisitions contact regarding two multi-family units.", user: "B. Mohammed", date: "2026-07-04" },
  { id: "act-06", propertyId: "prop-02", ownerId: "own-02", type: "Note", summary: "LLC registered agent confirms decision maker is available Tuesdays.", user: "B. Mohammed", date: "2026-07-05" },
  { id: "act-07", propertyId: "prop-04", ownerId: "own-04", type: "Skip Trace", summary: "Re-ran skip trace after mail returned, phone confidence now high.", user: "System", date: "2026-07-01" },
  { id: "act-08", propertyId: "prop-04", ownerId: "own-04", type: "Call", summary: "Left voicemail for trustee, referenced vacant property notice.", user: "B. Mohammed", date: "2026-07-07" },
  { id: "act-09", propertyId: "prop-08", ownerId: "own-08", type: "Email", summary: "Owner replied confirming out-of-state move in Q4, wants a fast timeline.", user: "B. Mohammed", date: "2026-07-01" },
  { id: "act-10", propertyId: "prop-05", ownerId: "own-05", type: "Note", summary: "First mailer sent, no response window has started.", user: "System", date: "2026-06-20" },
  { id: "act-11", propertyId: "prop-06", ownerId: "own-06", type: "Call", summary: "Landlord group asked for a written offer on 410 Boston Post Rd.", user: "B. Mohammed", date: "2026-07-02" },
  { id: "act-12", propertyId: "prop-12", ownerId: "own-10", type: "Email", summary: "Outreach email bounced, flagged for re-skip.", user: "System", date: "2026-06-16" },
];

// ---------------------------------------------------------------------------
// Source Trace (data provenance)
// ---------------------------------------------------------------------------

export const sourceTrace: SourceTraceEntry[] = [
  { id: "st-01", propertyId: "prop-01", source: "Westchester County Surrogate's Court", method: "Probate filing import", confidence: 96, capturedAt: "2026-05-02" },
  { id: "st-02", propertyId: "prop-01", source: "County Assessor Roll", method: "Bulk parcel sync", confidence: 99, capturedAt: "2026-04-18" },
  { id: "st-03", propertyId: "prop-04", source: "County Recorder", method: "Trust deed lookup", confidence: 90, capturedAt: "2026-05-10" },
  { id: "st-04", propertyId: "prop-05", source: "Lis Pendens Filing", method: "Pre-foreclosure feed", confidence: 84, capturedAt: "2026-06-01" },
  { id: "st-05", propertyId: "prop-02", source: "County Tax Collector", method: "Delinquent tax list", confidence: 93, capturedAt: "2026-04-30" },
];

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

export function getOwnerById(id: string): Owner | undefined {
  return owners.find((o) => o.id === id);
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getPropertiesForOwner(ownerId: string): Property[] {
  return properties.filter((p) => p.ownerId === ownerId);
}

export function getActivityForProperty(propertyId: string): Activity[] {
  return activities
    .filter((a) => a.propertyId === propertyId)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getActivityForOwner(ownerId: string): Activity[] {
  return activities
    .filter((a) => a.ownerId === ownerId)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export const dashboardStats = {
  totalProperties: properties.length,
  totalOwners: owners.length,
  avgOpportunityScore: Math.round(
    properties.reduce((sum, p) => sum + p.opportunityScore, 0) / properties.length
  ),
  hotLeads: properties.filter((p) => p.status === "Hot Lead").length,
  totalPortfolioValue: properties.reduce((sum, p) => sum + p.estValue, 0),
  newThisWeek: 5,
};

export const scoreTrend = [
  { week: "Wk 1", avgScore: 58 },
  { week: "Wk 2", avgScore: 61 },
  { week: "Wk 3", avgScore: 64 },
  { week: "Wk 4", avgScore: 63 },
  { week: "Wk 5", avgScore: 68 },
  { week: "Wk 6", avgScore: 71 },
  { week: "Wk 7", avgScore: 67 },
  { week: "Wk 8", avgScore: 66 },
];

export const leadSourceBreakdown = [
  { source: "Probate Filing", count: 2 },
  { source: "Tax Delinquent List", count: 3 },
  { source: "Trust Filing", count: 1 },
  { source: "Pre-Foreclosure", count: 1 },
  { source: "Direct Mail Reply", count: 2 },
  { source: "Relocation Signal", count: 1 },
  { source: "MLS Expired", count: 2 },
  { source: "Code Violation", count: 2 },
];

export const dataQualitySummary = {
  verifiedContacts: owners.filter((o) => o.contactStatus === "Verified").length,
  skipTraced: owners.filter((o) => o.contactStatus === "Skip-Traced").length,
  unverified: owners.filter((o) => o.contactStatus === "Unverified").length,
  bounced: owners.filter((o) => o.contactStatus === "Bounced").length,
  avgConfidence: Math.round(owners.reduce((s, o) => s + o.dataQuality, 0) / owners.length),
};
