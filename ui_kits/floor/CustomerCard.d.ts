import * as React from 'react';
export interface CustomerCardOutfitter { name: string; role?: string; initials?: string; src?: string; /** Override; default follows theme (ink on light, white on dark). */ tone?: 'ink' | 'white' | 'gold' | 'olive' | 'cream'; }
export interface CustomerCardFlag { label: string; from?: string; tone?: 'gold' | 'danger' | 'info'; }
export interface CustomerCardCta { label: string; tone?: 'neutral' | 'danger' | 'info'; onClick?: (e: React.MouseEvent) => void; disabled?: boolean; }
export interface CustomerCardProps {
  /** spec-ready v2 address. Auto-derived: card-case-<customer>#<instance> (card-hub-action when flagged). */
  specId?: string;
  /** Stable domain key (case id). Defaults to the customer name. */
  instance?: string;
  /** Surface the card sits on. Default 'light' (the floor board). */
  theme?: 'light' | 'dark';
  customer: string;
  interest?: string;
  partyType?: 'single' | 'couple' | 'family';
  /** Mono line under interest, e.g. '#47A3 · Finance · TX'. */
  meta?: string;
  /** Omit for unassigned: red edge + dashed "?" (tap to assign when onAssign is set). */
  outfitter?: CustomerCardOutfitter | null;
  phaseTime: string;
  totalTime: string;
  phaseLabel?: string;
  onOpen?: (e: React.SyntheticEvent) => void;
  onMenu?: (e: React.MouseEvent) => void;
  onAssign?: (e: React.MouseEvent) => void;
  selected?: boolean;
  /** Needs-action flag row (Action Hub rail). */
  flag?: CustomerCardFlag;
  /** Full-width ACTION bar at the foot. Never gold. */
  cta?: CustomerCardCta;
  /** Shows an X in the flag row. */
  onDismiss?: () => void;
  /** Extra attributes for inner controls, e.g. permission stamps: { menu: { 'data-bos-perm': 'case.view_detail', 'data-bos-access': 'act' } }. Spec IDs are not overridable here. */
  controlProps?: { menu?: Record<string, any>; assign?: Record<string, any>; cta?: Record<string, any>; dismiss?: Record<string, any> };
  /** Extra attributes for the root (draggable, onDragStart, data-*). */
  rootProps?: Record<string, any>;
}
export function CustomerCard(props: CustomerCardProps): JSX.Element;
