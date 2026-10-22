import * as React from 'react';
export interface CardProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from the label when omitted. */
  specId?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}
export function Card(props: CardProps): JSX.Element;

export interface StatTileProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from the label when omitted. */
  specId?: string;
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: 'up' | 'down' | 'neutral';
}
export function StatTile(props: StatTileProps): JSX.Element;

export interface UnitRowProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from the label when omitted. */
  specId?: string;
  id: string;
  title: string;
  phase: string;
  status: string;
  statusType?: 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  onClick?: () => void;
}
export function UnitRow(props: UnitRowProps): JSX.Element;
