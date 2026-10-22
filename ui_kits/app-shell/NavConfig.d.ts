import * as React from 'react';
export interface NavItem { id: string; label: string; short?: string; icon: string; group: string; custom?: boolean; }
export interface ActionItem { id: string; label: string; kind: 'pill' | 'terminal'; custom?: boolean; }
export interface Phase { id: string; label: string; }
export interface RoleNav {
  label: string; title: string;
  user: { name: string; short?: string; initials: string };
  status?: string; search?: string;
  /** Catalog ids switched on for this role (desktop panel, tablet drawer). */
  nav: string[];
  /** Two catalog ids for the mobile tab bar, left of the center Action. */
  mobile: string[];
  /** Catalog ids shown in the mobile hamburger menu. Omitted = every enabled button not in a tab-bar slot. */
  menu?: string[];
  /** Action-overlay ids switched on for this role. */
  actions: string[];
  phaseArc: boolean;
}
export interface NavConfigData { version: number; catalog: NavItem[]; actions: ActionItem[]; phases: Phase[]; roles: Record<string, RoleNav>; }
export interface ResolvedNav { role: RoleNav; groups: { label: string; items: NavItem[] }[]; items: NavItem[]; slots: NavItem[]; menuGroups: { label: string; items: NavItem[] }[]; actions: ActionItem[]; phases: Phase[]; }
export const NavConfig: {
  DEFAULTS: NavConfigData;
  load(): NavConfigData;
  save(next: NavConfigData): void;
  reset(): void;
  useConfig(): NavConfigData;
  navFor(cfg: NavConfigData, role: string): ResolvedNav;
  uniqueId(list: { id: string }[], label: string): string;
  slug(label: string): string;
};
/** Lucide icon node data keyed by Lucide icon name (e.g. 'store', 'layout-dashboard'). */
export type LucideNode = [string, Record<string, string | number>];
export const NAV_ICONS: Record<string, LucideNode[]>;
export const UI_ICONS: Record<string, LucideNode[]>;
/** Pre-Lucide v1 keys → Lucide names. */
export const ICON_ALIASES: Record<string, string>;
export const SHELL_THEME: Record<'light' | 'dark', Record<string, string>>;
export interface NavIconProps { /** Lucide icon name. */ name: string; size?: number; color?: string; stroke?: number; }
export function NavIcon(props: NavIconProps): JSX.Element;
