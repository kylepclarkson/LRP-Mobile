export type CreateStampRecordForm = {
  currencyCode: CurrencyCode;
  currencyAmount: number | null;
  details: string;
  errors: {
    currencyCode?: string;
    currencyAmount?: string;
    details?: string;
  };
};

export type CurrencyCode = "CAD" | "USD";

export type FormAction =
  | { type: "SET_CODE"; payload: CurrencyCode }
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_DETAILS"; payload: string }
  | { type: "RESET" };