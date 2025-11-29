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