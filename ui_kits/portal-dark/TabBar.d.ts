export interface TabBarProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from the label when omitted. */
  specId?: string;
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}
export function TabBar(props: TabBarProps): JSX.Element;
