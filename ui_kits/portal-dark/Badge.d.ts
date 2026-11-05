import * as React from 'react';
export interface BadgeProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from the label when omitted. */
  specId?: string;
  /** Surface the component sits on. 'light' = cream/white admin surfaces; 'dark' = portal surfaces. Default 'dark'. */
  theme?: 'light' | 'dark';
  type?: 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;
