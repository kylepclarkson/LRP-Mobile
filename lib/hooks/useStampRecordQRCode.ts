import { StampRecordQRCode } from "../api/stamps/stamps.types";


export function useStampRecordQRCode() {

  const encode = (stampRecordId: string): string => {
    const payload: StampRecordQRCode = { stampRecordId: stampRecordId }
    return JSON.stringify(payload);
  }

  const decode = (jsonDataString: string): StampRecordQRCode => {
    try {
      console.debug("jsonData",)
      const parsed = JSON.parse(jsonDataString) as StampRecordQRCode;
      if (!parsed?.stampRecordId) {
        throw new Error("Invalid QR payload",);
      }
      return parsed as StampRecordQRCode;
    } catch (err) {
      console.warn("Failed to decode QR.", err);
      throw err;
    }
  }

  return { encode, decode };
}