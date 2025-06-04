export interface HistoryItem {
  id: number;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  date: Date;
}

export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}