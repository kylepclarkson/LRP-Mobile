import { get, paths } from '@/lib/api/http/api';
import { StampDefinition } from "@/types/stamps";
import { BusinessRoleResponse } from './businesses.types';
import { BusinessUrls } from './businesses.urls';

// TODO : Move this to stamps.service.ts 
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


/**
 * Retrieve a list of the authenticated user's business roles. 
 */
export async function getUserBusinessRoles(): Promise<BusinessRoleResponse[]> {
  console.debug("Fetching user's business roles...");
  try {
    const data = await get<BusinessRoleResponse[]>(BusinessUrls.userRoles());
    return data;
  } catch (error) {
    console.error("Error fetching user's business roles", error);
    throw error;
  }
}