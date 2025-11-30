import { get, patch, paths, post } from '@/lib/services/api/api';
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

export type CreateStampCardRequest = {
  stampDefinitionId: string;
  transaction: {
    amount: number,
    currencyCode: string,
  }
}

export async function createStampRecord(req: CreateStampCardRequest) {
  console.debug("Creating StampRecord", req);
  const path = paths.rewards.stampRecords;
  try {
    const data = await post(path, req);
    return data
  } catch (error) {
    console.error("Error creating StampRecord");
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