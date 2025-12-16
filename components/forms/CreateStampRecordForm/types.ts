export type CreateStampRecordForm = CreateStampRecordFormData & {
  errors: {
    currencyCode?: string;
    currencyAmount?: string;
    details?: string;
  };
};

export type CreateStampRecordFormData = {
  currencyCode: CurrencyCode;
  currencyAmount: number;
  details: string;
}

export type CurrencyCode = "CAD" | "USD";

export type FormAction =
  | { type: "SET_CODE"; payload: CurrencyCode }
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_DETAILS"; payload: string }
  | { type: "RESET" };