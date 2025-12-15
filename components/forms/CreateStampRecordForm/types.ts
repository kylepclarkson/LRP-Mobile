export type CreateStampRecordForm = {
  currencyCode: string;
  currencyAmount: number | null;
  details: string;
  errors: {
    currencyAmount?: string;
    details?: string;
  };
};

export type FormAction =
  | { type: "SET_CODE"; payload: string }
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_DETAILS"; payload: string }
  | { type: "RESET" };