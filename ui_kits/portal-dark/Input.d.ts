export interface InputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  helper?: string;
  disabled?: boolean;
}
export function Input(props: InputProps): JSX.Element;
