import { StampDefinition } from "./stamps"

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

export const getStampDefinitionLabel = (def: StampDefinition) => def.title;

export type Transaction = {

}
