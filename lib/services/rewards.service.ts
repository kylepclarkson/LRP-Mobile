import { get, patch, paths } from '@/lib/services/api/api';
import { StampCard } from '@/types/types';


/** Retrieve the current user's StampCards. By default, it retrieves all 
 * StampCards that are not in a terminal state.
 */
export async function getStampCards(): Promise<StampCard[]> {
  console.debug("Fetching StampCards");
  try {
    const data = await get<StampCard[]>(paths.rewards.stampTokens);
    return data;
  } catch (error) {
    console.error("Error fetching StampCards:", error);
    throw error;
  }
}

export type AssignStampCardRequest = {
  stampDefinitionId: string
}

/**
 * Assigns the StampCard for this ID to the current user by attaching it to an active StampCard 
 * owned by this customer. 
 * @param stampCardId - The ID of the StampCard to be assigned.
 * @param req - Contains the StampDefinition ID for which this StampCard was created for. 
 * @returns 
 */
// TODO Add type to 'req' param.
export async function assignStampCard(stampCardId: string, req: AssignStampCardRequest) {
  console.debug(`Assigning stampCardId=${stampCardId}`);
  const path = paths.rewards.stampRecordAssign(stampCardId);
  try {
    const data = await patch(path, req);
    return data
  } catch (error) {
    console.error("Error assigning StampCard for current user", error);
    throw error;
  }
}