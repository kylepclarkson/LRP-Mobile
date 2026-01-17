import { AuthenticatedUser } from "@/types/types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";


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

/** Combine a list of Tailwind class values into a single value. */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}