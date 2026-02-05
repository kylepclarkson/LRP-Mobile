import { get } from "../http/api";
import { StampCard } from "./stamps.types";
import { StampsUrls } from "./stamps.urls";


export const StampsService = {
  getStampCards: (queryString?: string) => get<StampCard[]>(StampsUrls.getStampCards(queryString)),
}