export interface TabBarProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}
export function TabBar(props: TabBarProps): JSX.Element;
