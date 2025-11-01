
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

export type EmployeeGroup = {
  id: string,
  name: string,
  business: Business
}

export type Business = {
  id: string,
  name: string,
}

