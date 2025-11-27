import { paths, get, post } from '@/lib/services/api/api';
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