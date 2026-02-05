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
}


