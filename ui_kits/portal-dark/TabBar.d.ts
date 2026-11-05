export interface TabBarProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from the label when omitted. */
  specId?: string;
  /** Surface the component sits on. 'light' = cream/white admin surfaces; 'dark' = portal surfaces. Default 'dark'. */
  theme?: 'light' | 'dark';
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}
export function TabBar(props: TabBarProps): JSX.Element;
