export interface AppConfig {
  gifts: IGiftItem[];
  prizes: IPrizeItem[];
  speed: number[];
  rule: string;
}

export interface IPrizeItem {
  name: string;
  score: number;
  count: number;
  pic?: string;
}

export interface IGiftItem {
  id: number;
  probability: number;
  score: number;
  pic?: string;
  title?: string;
  top?: string;
  left?: string;
}
