import { UserBadgePayload } from "@/lib/badges/customerBadge";
import { useState } from "react";

export function useCreateOfferRewardForm() {

  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerFullName, setCustomerFullName] = useState<string | null>(null);
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function applyBadgePayload(payload: UserBadgePayload) {
    setCustomerId(payload.userId);
    setCustomerFullName(`${payload.firstName} ${payload.lastName}`);
  }

  function clearForm() {
    setCustomerId(null);
    setCustomerFullName(null);
  }

  async function submit(offerDefinitionId: string) {
    //todo
    console.debug(`submitting form called offerDefinitionId=${offerDefinitionId}`)
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