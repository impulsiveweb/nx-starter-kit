export interface IndexSignature {
  [index: string]: any;
}

export enum GENDER {
  male = "male",
  female = "female",
  other = "other"
}

export enum USER_TYPE {
  vendor = "vendor",
  operator = "operator"
}

export enum PASS_TYPE {
  monthly = "monthly",
  daily = "daily",
  weekly = "weekly"
}

export enum PRICING_TYPE {
  //'Standard' | 'Weekend(sat, sun)' | 'Weeeknd (fri, sat, sun)' | 'Spcial'
  standard = "Standard",
  weekendSatSun = "Weekend (Sat, Sun)",
  weekendFriSatSun = "Weekend (Fri, Sat, Sun)",
  special = "Special"
}

export interface Paginated<T> {
  rows: Array<T>;
  page: number;
  limit: number;
  count: number;
  meta?: any;
}
