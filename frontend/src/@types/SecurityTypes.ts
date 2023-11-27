export type Security = {
  ticker: string;
  securityname: string;
  sector: string;
  country: string;
  trend: number;
  prices: Prices[];
}
export type Prices = {
  date: string;
  close: string;
  volume: string;
}
export type FieldSecurityRows = {
  id: number;
  ticker: string;
  name: string;
  sector: string;
  country: string;
  trend: number;
}

export type FieldSecurityDetailRows = {
  id: number;
  ticker: string;
  name: string;
  sector: string;
  country: string;
  trend: number;
}