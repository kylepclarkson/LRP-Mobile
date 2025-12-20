import { StampDefinition, StampRecord } from "./types"


export type StampRecordQRCode = {
  // TODO encode stamp record json if needed. Need to update QR generator. 
  // stampRecord: StampRecord
  stampRecordId: string
}

export enum StampCardState {
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  REDEEMED = 'redeemed',
  EXPIRED = 'expired',
  ABANDONED = 'abandoned',
}

export type StampCard = {
  id: string
  state: string
  createdAt: Date
  stampDefinition: StampDefinition
  stampRecords: StampRecord[]
}

export type StampReward = {
  id: string,
}
