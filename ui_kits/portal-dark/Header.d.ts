export interface HeaderProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from the label when omitted. */
  specId?: string;
  /** Surface the component sits on. 'light' = cream/white admin surfaces; 'dark' = portal surfaces. Default 'dark'. */
  theme?: 'light' | 'dark';
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  meta?: [string, string][];
  /** Logo URL. Defaults to the theme's tag logo at ../../assets/ — pass a resolved path when the page isn't two folders deep. */
  logoSrc?: string;
}
export function Header(props: HeaderProps): JSX.Element;
