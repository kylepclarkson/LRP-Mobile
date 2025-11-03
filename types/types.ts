
/**
 * An authenticated user.
 */
export type AuthenticatedUser = {
  id: string,
  email: string,
  first_name: string,
  last_name: string,
  employee_groups: EmployeeGroup[]
}

export type UserDetails = {
  user: AuthenticatedUser,
  employee_groups: EmployeeGroup
}

export type EmployeeGroup = {
  id: string,
  name: string,
  business: Business
}

export type Business = {
  id: string,
  name: string,
}

export type StampDefinition = {
  id: string,
  title: string,
  description: string,
  progression_criteria: string,
  redemption_text: string,
  stamps_required: number,
  created_at: Date,
}

export type StampCard = {
  id: string,
  state: string,
  created_at: Date,
  definition: StampDefinition,
}
