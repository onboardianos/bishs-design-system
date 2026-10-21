import * as React from 'react';
export interface BadgeProps {
  type?: 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;
