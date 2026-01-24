
export const BusinessResourceUrls = {
  /**
   * Fetches stamp definitions for a business. 
   */
  stampDefinitions: (
    businessId: string | number,
    params?: Record<string, string | number | boolean | undefined>
  ) => {
    const base = `businesses/${businessId}/stamp-definitions/`
    if (!params) return base;
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value))
      }
    })

    const qs = query.toString()
    return qs ? `${base}?${qs}` : base
  },

  /** Retrieve catalog items for a specific business. */
  catalogItems: (
    businessId: string | number,
  ) => {
    return `businesses/${businessId}/items/`
  },

  /** Retrieve offer definitions for a specific business. */
  offerDefinitions: (
    businessId: string | number,
  ) => {
    return `businesses/${businessId}/offer-definitions/`
  },


  /**
   * Create an offer reward instance for this business. 
   */
  createOfferReward: (
    businessId: string,
  ) => {
    return `businesses/${businessId}/offer-rewards/`
  }
}