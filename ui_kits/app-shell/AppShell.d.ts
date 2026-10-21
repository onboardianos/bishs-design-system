import * as React from 'react';
import type { ActionItem, Phase } from './NavConfig';

export interface AppShellProps {
  /** Role key in NavConfig (admin · manager · outfitter · receptionist · tech · customer, or any admin-added role). */
  role?: string;
  /** Current nav id. 'alerts' and 'messenger' are the fixed mobile tabs. */
  activeId?: string;
  onNavigate?: (id: string) => void;
  /** When provided, the profile menu shows a "View as role" switcher (prototype/demo use). */
  onRoleChange?: (role: string) => void;
  /** Mobile Action overlay: a pill or terminal action was tapped. */
  onAction?: (actionId: string) => void;
  /** Mobile Action overlay: a phase on the phase arc was tapped. */
  onPhase?: (phaseId: string) => void;
  currentPhase?: string;
  alerts?: number;
  /** BISHS›OS wordmark for light surfaces; falls back to a type-rendered wordmark. */
  logoSrc?: string;
  logoSrcDark?: string;
  theme?: 'light' | 'dark';
  /** CSS height of the shell. Defaults to 100vh; pass '100%' inside a sized artboard or stage. */
  height?: string | number;
  children?: React.ReactNode;
}
export function AppShell(props: AppShellProps): JSX.Element;

export interface ActionOverlayProps {
  actions?: ActionItem[];
  phases?: Phase[];
  currentPhase?: string;
  onAction?: (actionId: string) => void;
  onPhase?: (phaseId: string) => void;
  onClose?: () => void;
  bottomInset?: number;
}
export function ActionOverlay(props: ActionOverlayProps): JSX.Element;
