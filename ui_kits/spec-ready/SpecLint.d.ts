export interface SpecLintItem { tag: string; text: string; id: string | null; suggested: string | null; el: Element; }
export interface SpecLintReport {
  /** true only when coverage is 100% and there are no duplicates, invalid ids, extra commits or nested layers. */
  pass: boolean;
  coverage: number;
  interactive: number;
  stamped: number;
  unstamped: SpecLintItem[];
  duplicates: SpecLintItem[];
  invalid: SpecLintItem[];
  commitViolations: number;
  nestedLayers: number;
}
export const SpecLint: {
  run(root?: ParentNode): SpecLintReport;
  overlay(root?: ParentNode): SpecLintReport;
  clear(): void;
  makeSpecId(prefix: string, label: unknown, instance?: unknown): string;
  slug(label: unknown): string;
  INTERACTIVE: string;
  /** Snapshot every stamped node in one state (+ lint). meta = { state, width }. */
  snapshot(root?: ParentNode, meta?: { state: string; width?: number }): SpecSnapshot;
  /** Merge snapshots into the per-build manifest (IDs scoped BUILD::id). */
  manifest(build: string, snaps: SpecSnapshot[], version?: string): SpecManifest;
  /** Markdown requirements skeleton, one row per element family, grouped by frame. */
  requirements(manifest: SpecManifest): string;
  /** Jira-importable tickets: epics by area, one story per screen section or overlay frame, spikes from open questions. Stories with no traced source are labelled needs-rule and Blocked. */
  tickets(manifest: SpecManifest, spec?: Record<string, unknown>, opts?: { intake?: { rules: Record<string, { text: string; source: string }> }; ruleMap?: Record<string, string[]>; precedents?: unknown[]; questions?: { id: string; text: string }[] }): { rows: Record<string, unknown>[]; csv: string; stories: number; blocked: number };
  CANON_DOD: string[];
  download(name: string, text: string, type?: string): void;
};
export interface SpecEntry { id: string; family: string; instance: string | null; level: string; class: string | null; type: string | null; section: string | null; layer: string | null; frame: string | null; tag: string; role: string | null; interactive: boolean; guideSafe: boolean; label: string; }
export interface SpecSnapshot { state: string; width?: number; lint: Record<string, number | boolean>; entries: SpecEntry[]; }
export interface SpecManifest { build: string; version: string; generated: string; spec: string; states: string[]; gates: Record<string, unknown>[]; count: number; entries: (SpecEntry & { key: string; states: string[]; widths: number[] })[]; }
/** `<prefix>-<slug>[#<instance>]`, e.g. makeSpecId('btn-commit', 'Check in') → 'btn-commit-check-in'. */
export function makeSpecId(prefix: string, label: unknown, instance?: unknown): string;
