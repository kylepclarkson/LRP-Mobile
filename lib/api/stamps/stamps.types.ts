import { Business } from "@/types/businesses";


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
  ABANDONED = 'abandoned'
}

export type StampCard = {
  id: string
  state: string
  createdAt: Date
  stampProgram: StampProgram
  stampRecords: StampRecord[]
}

export type StampReward = {
  id: string
}

export type StampProgram = {
  id: string
  title: string
  description: string
  progressionText: string
  redemptionText: string
  stampsRequired: number
  createdAt: Date
  state: StampProgramState
  business: Business
}
export type StampRecord = {
  id: string
}
export type StampProgramState = 'active' | 'sunset' | 'inactive'
