import { get, paths } from '@/lib/services/api/api';
import { StampDefinition } from '@/types/types';

export async function getStampDefinitions(businessId: string): Promise<StampDefinition[]> {
  console.debug(`Fetching StampDefinitions for businessId=${businessId}`);
  try {
    const data = await get<StampDefinition[]>(paths.businesses.stampDefinitions(businessId));
    return data;
  } catch (error) {
    console.error("Error fetching StampDefinitions", error);
    throw error;
  }
}