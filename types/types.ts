import { StampProgram } from "@/lib/api/stamps/stamps.types"
import { Business } from "./businesses"

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

export type UserAppMode = {

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

export const getstampProgramLabel = (def: StampProgram) => def.title;

export type Transaction = {

}
