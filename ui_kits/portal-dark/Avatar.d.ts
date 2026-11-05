import * as React from 'react';
export interface AvatarProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from name/initials when omitted. */
  specId?: string;
  /** Two-letter initials shown when no photo. */
  initials?: string;
  /** Full name, used as the accessible label. */
  name?: string;
  /** Surface the avatar sits on. light → ink fill; dark → white fill. Default 'light'. */
  theme?: 'light' | 'dark';
  /** Overrides the theme default. gold = signed-in user only. */
  tone?: 'ink' | 'white' | 'gold' | 'olive' | 'cream';
  /** sm = 28px, default = 32px (kit), lg = 44px (touch-target size). */
  size?: 'sm' | 'default' | 'lg';
  /** Optional photo URL; replaces initials. */
  src?: string;
}
export function Avatar(props: AvatarProps): JSX.Element;
