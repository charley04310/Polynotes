export interface IStyleBlock {
  fontWeight: string;
  fontSize: string;
  borderBottom: string;
  color: string;
}
export interface ICustomize {
  bold: string;
  size: string;
  border: string;
  color: string;
}

export interface ITextBlock {
  content: string;
  id: string;
  style: IStyleBlock;
}
