
/**
 * An authenticated user.
 */
export type AuthenticatedUser = {
  id: string,
  email: string,
  first_name: string,
  last_name: string,
  employeeGroups: EmployeeGroup[]
}

export type UserDetails = {
  user: AuthenticatedUser,
  employeeGroups: EmployeeGroup[]
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
  progressionText: string,
  redemptionText: string,
  stampsRequired: number,
  createdAt: Date,
  business: Business,
}

export type StampCard = {
  id: string,
  state: string,
  createdAt: Date,
  stampDefinition: StampDefinition,
  stampRecords: StampRecord[],
}

export type StampRecord = {
  id: string,
}