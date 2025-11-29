import { AuthenticatedUser } from "@/types/types";

/**
 * Returns True if this user is a member of any EmployeeGroup. 
 * @param user 
 * @returns 
 */
export function isEmployee(user: AuthenticatedUser | null) {
  if (user) {
    if (user.employeeGroups && user.employeeGroups.length > 0) {
      return true;
    }
  }
  return false;
} 

/**
 * Bottom sheet snap point values
 */
export const snapPointValues = ["25%", "40%", "80%"];