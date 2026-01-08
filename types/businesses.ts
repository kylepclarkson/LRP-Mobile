
/** A business role definition. */
export type RoleDefinition = {
  name: "employee" | "manager" | "owner",
}

/** A business within Aandeg */
export type Business = {
  id: string
  name: string
}

/** A specific role instance tied to a user and business */
export type BusinessRole = {
  id: string, 
  role: RoleDefinition,
  business: Business
}
