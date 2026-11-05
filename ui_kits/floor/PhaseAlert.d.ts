import * as React from 'react';
export interface PhaseAlertPerson {
  name: string;
  /** e.g. 'Outfitter'. Omit for the customer row. */
  role?: string;
  initials?: string;
  src?: string;
  /** Avatar tone override. Default follows the surface: ink on the white body. */
  tone?: 'ink' | 'white' | 'gold' | 'olive' | 'cream';
}
export interface PhaseAlertProps {
  /** spec-ready v2 address. Auto-derived as card-phase-alert-<title>#<instance>. */
  specId?: string;
  /** Stable domain key for the stamp instance (case id or customer). */
  instance?: string;
  /** Head-strip eyebrow, e.g. 'New MCP', 'New worksheet'. */
  eyebrow?: string;
  /** Who raised it; renders as "· from <from>". */
  from?: string;
  title?: string;
  people?: PhaseAlertPerson[];
  /** Seconds already waited; the timer counts up from here. */
  waitSeconds?: number;
  /** Floor limit in seconds. Past it the well turns danger and reads "Over limit". */
  limitSeconds?: number;
  /** The single COMMIT label, e.g. 'Do MCP now', 'Start deal now'. */
  ctaLabel?: string;
  snoozeLabel?: string;
  onCommit?: () => void;
  /** Omit to hide Snooze. */
  onSnooze?: () => void;
  /** Omit to hide the head-strip X. */
  onDismiss?: () => void;
  /** false freezes the timer (canvas artboards, print). Default true. */
  live?: boolean;
  /** Override for every row. Default follows the surface (ink). */
  avatarTone?: 'ink' | 'white' | 'gold' | 'olive' | 'cream';
}
export function PhaseAlert(props: PhaseAlertProps): JSX.Element;
