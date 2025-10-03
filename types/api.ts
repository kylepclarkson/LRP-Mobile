export interface ValidationErrors {
  [field: string]: string[];
}

export interface ApiError extends Error {
  status: number;
  // Either a detail object or field-error mapping. 
  data: { detail?: string } | ValidationErrors;
}