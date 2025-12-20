import { get, patch, paths, post } from '@/lib/services/api/api';
import { StampCard } from "@/types/stamps";
import { Transaction } from '@/types/types';


/** Retrieve the current user's StampCards. By default, it retrieves all 
 * StampCards that are not in a terminal state.
 */
export async function getStampCards(queryString?: string): Promise<StampCard[]> {
  console.debug(`Fetching StampCards w/ queryString=${queryString}`);
  try {
    const data = await get<StampCard[]>(paths.stamps.stampCardList(queryString));
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

export type CreateStampCardResponse = {
  stampDefinitionId: string,
  stampRecordId: string,
  createdAt: Date,
  claimBy: Date,
  state: string, // TODO - define enum that matches backend
  transaction: Transaction
}

export async function createStampRecord(req: CreateStampCardRequest): Promise<CreateStampCardResponse> {
  console.debug("Creating StampRecord", req);
  const path = paths.rewards.stampRecords;
  try {
    const data = await post<CreateStampCardResponse>(path, req);
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      claimBy: new Date(data.claimBy)
    }
  } catch (error) {
    console.error("Error creating StampRecord");
    throw error;
  }
}

export enum StampRecordState {
  CREATED = "created",
  PENDING = "pending",
  CLAIMED = "claimed",
  EXPIRED = "expired",
  REVOKED = "revoked",
}

export type StampRecordUpdateStateRequest = {
  state: StampRecordState
}

export type StampRecordUpdateStateResponse = CreateStampCardResponse;

export async function stampRecordUpdateState(
  stampRecordId: string,
  req: StampRecordUpdateStateRequest
): Promise<StampRecordUpdateStateResponse> {
  console.debug("Updating stamp record state");
  const path = paths.stamps.stampRecordUpdateState(stampRecordId)
  try {
    const data = await patch<StampRecordUpdateStateResponse>(path, req);
    return data;
  } catch (error) {
    console.error("Error updating stamp record state");
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

export type ClaimStampRecordResponse = CreateStampCardResponse;

/**
 * Assigns the stamp record to the customer who is claiming it. 
 * @param stampRecordId 
 * @returns 
 */
export async function claimStampRecord(stampRecordId: string): Promise<ClaimStampRecordResponse> {
  console.debug(`Claiming stamp record id=${stampRecordId}`);
  const path = paths.stamps.stampRecordClaim(stampRecordId);
  try {
    const data = await patch<ClaimStampRecordResponse>(path, {});
    return data
  } catch (error) {
    console.error("Error claiming stamp card", error);
    throw error;
  }
}