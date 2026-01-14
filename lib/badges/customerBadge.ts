
/**
 * The type that will be encoded to a QR code that for the user's rewards.
 */
export type UserBadgePayload = {
  _namespace: "aandeg";
  _type: "customer-badge";
  _version: 1;
  userId: string;
  generatedAt: string;
};

/**
 * Create a UserBadgePayload instance. 
 */
export function createUserBadgePayload(userId: string): UserBadgePayload {
  return {
    _namespace: "aandeg",
    _type: "customer-badge",
    _version: 1,
    userId,
    generatedAt: new Date().toISOString()
  }
}

/**
 * Convert UserBadgePayload instance to JSON. 
 */
export function stringifyBadgePayload(payload: UserBadgePayload): string {
  return JSON.stringify(payload);
}

/** 
 * Validates JSON as UserBadgePayload instance.
 */
export function parseBadgePayload(raw: string): UserBadgePayload | null {
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed._namespace === "aandeg" &&
      parsed._type === "customer-badge"
    ) {
      return parsed as UserBadgePayload;
    }
    return null
  } catch {
    return null
  }
}

