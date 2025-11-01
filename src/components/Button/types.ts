export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  active?: boolean;
  colorButton?: string;
}
