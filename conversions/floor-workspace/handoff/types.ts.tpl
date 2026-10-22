// Floor Workspace — domain types. Source of truth for api-contract.md and data-contract.md.
// Copy into src/features/floor/types.ts.

export type Role = 'manager' | 'receptionist' | 'admin' | 'gm' | 'outfitter' | 'fi' | 'tech' | 'customer';
export type Access = 'hidden' | 'read' | 'act' | 'reason' | 'approve' | 'disabled';

export type PhaseId = 'waiting' | 'assigned' | 'discovery' | 'mcp' | 'lotwalk' | 'worksheet' | 'twomin' | 'delivery';
export type PhaseTone = 'danger' | 'neutral' | 'info' | 'warning' | 'success';
export interface Phase { id: PhaseId; label: string; tone: PhaseTone; order: number; }

export interface Outfitter { id: string; name: string; first: string; initials: string; photoUrl: string | null; storeId: string; }

export type RepState = 'up_now' | 'available' | 'with_customer' | 'paused' | 'benched';
export interface RotationEntry {
  outfitterId: string;
  position: number;                 // 0 = top of rotation
  state: RepState;                  // exactly one 'up_now' per store
  chip: string;                     // display text for the card chip
  mtdUnits: number;
  activeCaseId?: string;            // when with_customer
  deliveryToday?: string;           // customer name -> hexagon
  pause?: { reason: PauseReason; detail?: string; duration: string; returnsAt: string; byUserId: string; requested?: boolean };
  bench?: { reason: BenchReason; duration: BenchDuration; note: string; byUserId: string; at: string };
  unread: number;                   // unread messages for the viewing user
}

export type PartyType = 'single' | 'couple' | 'family';
export type UnitType = 'Travel Trailer' | 'Fifth Wheel' | 'Toy Hauler' | 'Motorhome' | 'Truck Camper' | 'Destination' | 'Class A' | 'Bunkhouse';
export interface Case {
  id: string;                       // stable domain key, used as stamp instance
  storeId: string;
  phase: PhaseId;
  customer: string;                 // household display name
  buyers: { first: string; last: string; role: 'buyer' | 'co-buyer' }[];
  partyType: PartyType;
  interest: UnitType;
  outfitterId: string | null;
  checkedInAt: string;              // ISO, drives `total`
  phaseEnteredAt: string;           // ISO, drives `since`
  source: 'walk-in' | 'appointment' | 'returning';
  notes: { id: string; text: string; byUserId: string; at: string }[];
}
export interface Exit { id: string; caseId: string; phase: PhaseId; customer: string; outfitterId: string | null; reason: LeftReason; note?: string; at: string; }

export type ScheduleKind = 'sale' | 'delivery';
export interface ScheduleItem { id: string; kind: ScheduleKind; at: string; customer: string; outfitterId: string; unit: string; status: string; delay: boolean; todos: string[]; notes: string[]; arrivedAt?: string; }

export interface RepStats { range: 'today' | 'week' | 'month'; demos: number; writeUps: number; sold: number; goal: number; grossPerUnit: number; avgMinutes: number; }
export interface ChatMessage { id: string; threadId: string; fromUserId: string; text: string; at: string; }
export interface PhaseStats { phase: PhaseId; checkedInToday: number; enteredPhase: number; currentlyInPhase: number; conversion: number; exits: number; avgMinutesInPhase: number; }

export type LeftReason = 'just-researching' | 'out-of-budget' | 'no-decision-maker' | 'coming-back-later' | 'got-a-call' | 'no-available-outfitter' | 'unknown';
export type OverrideReason = 'up-not-up-front' | 'customer-requested' | 'out-of-turn';
export type PauseReason = 'lunch' | 'checkin' | 'break' | 'unavailable' | 'other';
export type BenchReason = 'performance-review' | 'absence' | 'training' | 'admin-work' | 'disciplinary';
export type BenchDuration = 'rest-of-today' | '1-day' | '1-week' | 'indefinite';
export type MoveRepReason = 'not-prepared' | 'not-up-front' | 'not-found' | 'on-phone' | 'returning-customer' | 'other';

export interface FloorSnapshot { storeId: string; asOf: string; phases: Phase[]; rotation: RotationEntry[]; cases: Case[]; exits: Exit[]; schedule: ScheduleItem[]; }
