import * as React from 'react';
export interface ChoiceChipProps {
  /** spec-ready v2 address. Auto-derived: input-choice-<label>[#instance]. */
  specId?: string;
  /** Pass the question key when the same label appears in two questions. */
  instance?: string;
  label: string;
  selected?: boolean;
  /** true = checkbox semantics (select all that apply). Default radio. */
  multi?: boolean;
  disabled?: boolean;
  /** lg = 56px question answers (default). md = 44px, for in-dialog choices. */
  size?: 'md' | 'lg';
  onClick?: () => void;
  theme?: 'light' | 'dark';
}
export function ChoiceChip(props: ChoiceChipProps): JSX.Element;

export interface ChoiceGroupProps {
  /** Gold-lo overline label, e.g. 'How would you rate your credit?' */
  label?: string;
  multi?: boolean;
  theme?: 'light' | 'dark';
  /** compact = every option visible at once (configurators, in-app steps). Default comfortable. */
  density?: 'comfortable' | 'compact';
  children?: React.ReactNode;
}
export function ChoiceGroup(props: ChoiceGroupProps): JSX.Element;

export interface QuestionCardProps {
  /** spec-ready v2 address. Auto-derived: card-question-<title>. */
  specId?: string;
  /** e.g. 'Step 1 · Lifestyle' */
  overline?: string;
  title: string;
  /** e.g. '(select all that apply)' */
  hint?: string;
  theme?: 'light' | 'dark';
  /** compact = every option visible at once (configurators, in-app steps). Default comfortable. */
  density?: 'comfortable' | 'compact';
  children?: React.ReactNode;
}
export function QuestionCard(props: QuestionCardProps): JSX.Element;
