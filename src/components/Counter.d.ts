declare const Counter: React.FC<{
  value: number;
  fontSize?: number;
  padding?: number;
  places?: (number | ".")[];
  gap?: number;
  borderRadius?: number;
  horizontalPadding?: number;
  textColor?: string;
  fontWeight?: string;
  containerStyle?: React.CSSProperties;
  counterStyle?: React.CSSProperties;
  digitStyle?: React.CSSProperties;
  gradientHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  topGradientStyle?: React.CSSProperties;
  bottomGradientStyle?: React.CSSProperties;
}>;

export default Counter;
