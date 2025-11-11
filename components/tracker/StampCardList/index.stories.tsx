import { StampCard } from "@/types/types";
import { Meta, StoryObj } from "@storybook/react-native";
import Component from "react-native-paper/lib/typescript/components/List/ListItem";
import { StampCardList } from ".";


const stampCardsData: StampCard[] = [
  {
    id: '1',
    state: "in_progress",
    createdAt: new Date(),
    stampDefinition: {
      id: "1",
      title: 'Buy 10 coffees, get 1 free',
      description: "This is a sample stamp card",
      progressionText: "",
      redemptionText: "",
      stampsRequired: 10,
      createdAt: new Date(),
      business: {
        id: "1",
        name: "Coco Cafe",
      }
    },
    stampRecords: [
      {
        id: '1',
      }, {
        id: '2',
      }
    ]
  }, {
    id: '2',
    state: "in_progress",
    createdAt: new Date(),
    stampDefinition: {
      id: "1",
      title: 'Buy 5 coffees, get 1 free',
      description: "This is a sample stamp card",
      progressionText: "",
      redemptionText: "",
      stampsRequired: 5,
      createdAt: new Date(),
      business: {
        id: "1",
        name: "Tim's Coffee",
      }
    },
    stampRecords: [
      {
        id: '1',
      }, {
        id: '2',
      }, {
        id: '3',
      }
    ]
  }
];

const meta = { component: StampCardList } satisfies Meta<typeof StampCardList>;

export default meta;
export const StampCardListStory: StoryObj<typeof meta> = {
  args: {
    stampCards: stampCardsData,
  }
};
