
/**
 * An authenticated user.
 */
export type AuthenticatedUser = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
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
export const getEmployeeGroupLabel = (group: EmployeeGroup) => `${group.business.name} - ${group.name}`;

export type Business = {
  id: string,
  name: string,
}

export type StampDefinitionState = 'active' | 'sunset' | 'inactive';

export type StampDefinition = {
  id: string,
  title: string,
  description: string,
  progressionText: string,
  redemptionText: string,
  stampsRequired: number,
  createdAt: Date,
  state: StampDefinitionState,
  business: Business,
}
export const getStampDefinitionLabel = (def: StampDefinition) => def.title;

export type StampRecord = {
  id: string,
}

export type Transaction = {

}
