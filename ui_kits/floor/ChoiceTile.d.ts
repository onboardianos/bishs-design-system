import * as React from 'react';
export interface ChoiceTileProps {
  /** spec-ready v2 address. Auto-derived: input-choice-tile-<label>[#instance]. */
  specId?: string;
  /** Pass the question key when the same label appears in two questions. */
  instance?: string;
  label: string;
  /** Live effect line under the label, e.g. '1,204 units remain'. */
  hint?: string;
  /** neutral = no effect · gate = removes units · rank = ranks higher · avoid = ranks lower. */
  hintTone?: 'neutral' | 'gate' | 'rank' | 'avoid';
  /** Photo URL (relative path). Takes precedence over icon. */
  image?: string;
  /** cover (default) = photo fills the panel · contain = cut-out artwork (RV illustrations) sits inside the panel with padding, never cropped. */
  imageFit?: 'cover' | 'contain';
  /** Lucide icon node shown on the media panel when there is no photo. */
  icon?: React.ReactNode;
  selected?: boolean;
  /** true = checkbox semantics (select all that apply). Default radio. */
  multi?: boolean;
  disabled?: boolean;
  /** Wider media panel (1.6:1) for two-up first questions. */
  wide?: boolean;
  onClick?: () => void;
  /** Rendered below the tile button, outside it (e.g. a "Required" checkbox). */
  footer?: React.ReactNode;
  theme?: 'light' | 'dark';
  /** compact = smaller media panel, 14px label. Use with QuestionCard density="compact" so every option is visible at once. */
  density?: 'comfortable' | 'compact';
}
export function ChoiceTile(props: ChoiceTileProps): JSX.Element;
