import * as React from 'react';
export interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}
export function Card(props: CardProps): JSX.Element;

export interface StatTileProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: 'up' | 'down' | 'neutral';
}
export function StatTile(props: StatTileProps): JSX.Element;

export interface UnitRowProps {
  id: string;
  title: string;
  phase: string;
  status: string;
  statusType?: 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  onClick?: () => void;
}
export function UnitRow(props: UnitRowProps): JSX.Element;
