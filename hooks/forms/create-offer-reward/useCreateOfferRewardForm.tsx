import { BusinessResourceService } from "@/lib/api/business-resource/business-resource.service";
import { CreateOfferRewardRequest } from "@/lib/api/business-resource/business-resource.types";
import { UserBadgePayload } from "@/lib/badges/customerBadge";
import { useState } from "react";

export function useCreateOfferRewardForm() {

  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerFullName, setCustomerFullName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function applyBadgePayload(payload: UserBadgePayload) {
    setCustomerId(payload.userId);
    setCustomerFullName(`${payload.firstName} ${payload.lastName}`);
  }

  function clearForm() {
    setCustomerId(null);
    setCustomerFullName(null);
    setError(null);
  }

  async function submit(businessId: string, offerDefinitionId: string) {
    console.debug(`submitting form called offerDefinitionId=${offerDefinitionId}`);

    if (!offerDefinitionId || !customerId) {
      setError("Customer ID is missing");
      return;
    }
    try {
      const payload: CreateOfferRewardRequest = {
        offerDefinitionId: offerDefinitionId,
        issuanceMechanismType: "manual",
        ownerId: customerId
      }

      const res = await BusinessResourceService.createOfferReward(businessId, payload);
      console.debug("Result=", JSON.stringify(res));
    } catch (err) {
      console.debug("Error received");
      setError("Unable to create offer reward");
    }

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