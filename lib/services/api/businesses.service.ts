import { get, paths } from '@/lib/services/api/api';
import { StampDefinition } from "@/types/stamps";

export async function getStampDefinitions(businessId: string, params?: string): Promise<StampDefinition[]> {
  console.debug(`Fetching StampDefinitions for business_id=${businessId}, params=${params}`);
  try {
    const data = await get<StampDefinition[]>(paths.businesses.stampDefinitions(businessId, params));
    return data;
  } catch (error) {
    console.error("Error fetching StampDefinitions", error);
    throw error;
  }
}