export interface HeaderProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from the label when omitted. */
  specId?: string;
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  meta?: [string, string][];
}
export function Header(props: HeaderProps): JSX.Element;
