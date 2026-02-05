import { get, paths } from '@/lib/api/http/api';
import { BusinessRole } from '@/types/businesses';
import { StampProgram } from "../stamps/stamps.types";
import { BusinessUrls } from './businesses.urls';

// TODO : Move this to stamps.service.ts 
export async function getstampPrograms(businessId: string, params?: string): Promise<StampProgram[]> {
  console.debug(`Fetching stampPrograms for business_id=${businessId}, params=${params}`);
  try {
    const data = await get<StampProgram[]>(paths.businesses.stampPrograms(businessId, params));
    return data;
  } catch (error) {
    console.error("Error fetching stampPrograms", error);
    throw error;
  }
}




export const BusinessService = {
  /**
   * Retrieve a list of the authenticated user's business roles. 
   */
  getUserRoles: () => get<BusinessRole[]>(BusinessUrls.userRoles())

};