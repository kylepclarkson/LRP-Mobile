import { get } from "@/lib/api/http/api";
import { OfferReward } from "./offers.types";
import { OfferUrls } from "./offers.urls";

export const OffersService = {

  getOfferReward: (offerRewardId: string) => get<OfferReward>(OfferUrls.offerRewardDetail(offerRewardId)),

}