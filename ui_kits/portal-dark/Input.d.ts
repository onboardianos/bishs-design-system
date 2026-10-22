export interface InputProps {
  /** spec-ready v2 address (data-spec-id). Auto-derived from the label when omitted. */
  specId?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  helper?: string;
  disabled?: boolean;
}
export function Input(props: InputProps): JSX.Element;
