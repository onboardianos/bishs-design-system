import * as React from 'react';
export interface ButtonProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from the label when omitted. */
  specId?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
