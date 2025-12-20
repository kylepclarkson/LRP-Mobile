import { StampCard } from "@/types/stamps";
import { Meta, StoryObj } from "@storybook/react-native";
import { StampCardList } from ".";


const stampCardsData: StampCard[] = [
  {
    id: '1',
    state: "in_progress",
    createdAt: new Date(),
    stampDefinition: {
      id: "1",
      title: 'Free bag of dog food',
      description: "Buy 5 bags of FirstMates dog food and receive a free one.",
      progressionText: "Purchase at any Chico Pets location or online.",
      redemptionText: "Redeem at any Chico Pets location or online.",
      stampsRequired: 10,
      createdAt: new Date(),
      business: {
        id: "1",
        name: "Chico Pet Toys",
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
  }, {
    id: '3',
    state: "in_progress",
    createdAt: new Date(),
    stampDefinition: {
      id: "1",
      title: 'Free bag of dog food',
      description: "Buy 5 bags of FirstMates dog food and receive a free one.",
      progressionText: "Purchase at any Chico Pets location or online.",
      redemptionText: "Redeem at any Chico Pets location or online.",
      stampsRequired: 10,
      createdAt: new Date(),
      business: {
        id: "1",
        name: "Chico Pet Toys",
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
    id: '4',
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
