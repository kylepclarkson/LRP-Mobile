import { StampRecordQRCode } from "@/types/stamps";




export function useStampRecordQRCode() {

  const encode = (stampRecordId: string): string => {
    const payload: StampRecordQRCode = { stampRecordId: stampRecordId }
    return JSON.stringify(payload);
  }

  const decode = (qrString: string): StampRecordQRCode => {
    try {
      const parsed = JSON.parse(qrString);
      if (!parsed?.stampRecord) {
        throw new Error("Invalid QR payload");
      }
      return parsed as StampRecordQRCode;
    } catch (err) {
      console.warn("Failed to decode QR.", err);
      throw err;
    }
  }

  return { encode, decode };
}