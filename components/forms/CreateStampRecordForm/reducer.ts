import { CreateStampRecordForm, FormAction } from "./types";

export const initialFormState: CreateStampRecordForm = {
  currencyCode: "CAD",
  currencyAmount: null,
  details: "",
  errors: {},
};

export function formReducer(
  state: CreateStampRecordForm,
  action: FormAction
): CreateStampRecordForm {
  switch (action.type) {
    case "SET_CODE":
      return { ...state, currencyCode: action.payload };

    case "SET_AMOUNT": {
      const parsed = parseFloat(action.payload);
      if (isNaN(parsed) || parsed <= 0) {
        return {
          ...state,
          errors: { ...state.errors, currencyAmount: "Must be a positive number" },
        };
      }
      return {
        ...state,
        currencyAmount: parsed,
        errors: { ...state.errors, currencyAmount: undefined },
      };
    }

    case "SET_DETAILS": {
      if (action.payload.length > 200) {
        return {
          ...state,
          errors: { ...state.errors, details: "Max 200 characters" },
        };
      }
      return {
        ...state,
        details: action.payload,
        errors: { ...state.errors, details: undefined },
      };
    }

    case "RESET":
      return initialFormState;

    default:
      return state;
  }
}