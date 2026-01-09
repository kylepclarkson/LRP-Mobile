

export const BusinessResourceUrls = {
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
}