import { UserBadgePayload } from "@/lib/badges/customerBadge";
import { useState } from "react";

export function useCreateStampRecordForm() {

  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerFullName, setCustomerFullName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function applyBadgePayload(payload: UserBadgePayload) {
    setCustomerId(payload.userId);
    setCustomerFullName(`${payload.firstName} ${payload.lastName}`);
  }

  function clearForm() {
    setCustomerId(null);
    setCustomerFullName(null);
    setError(null);
  }

  // TODO implement submit function
  async function submit(stampProgramId: string): Promise<boolean> {
    console.debug(`Submitting form with stampProgramId=${stampProgramId} and customerId=${customerId}`);
    return Promise.resolve(true);
  }

  return {
    customerId,
    customerFullName,
    isSubmitting,
    error,
    submit,
    applyBadgePayload,
    clearForm
  }
}
