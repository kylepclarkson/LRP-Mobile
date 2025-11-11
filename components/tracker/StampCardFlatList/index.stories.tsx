import { StampCard } from "@/types/types";
import { Meta, StoryObj } from "@storybook/react-native";
import { StampCardFlatListItem } from "./index";

const meta = {
  component: StampCardFlatListItem,
} satisfies Meta<typeof StampCardFlatListItem>;;

export default meta;

type Story = StoryObj<typeof meta>;

const STAMP_CARDS: StampCard[] = [
  {
    id: '1',
    state: "in_progress",
    createdAt: new Date(),
    stampDefinition: {
      id: "1",
      title: 'Free Coffee Card',
      description: "This is a sample stamp card",
      progressionText: "",
      redemptionText: "",
      stampsRequired: 10,
      createdAt: new Date(),
      business: {
        id: "1",
        name: "Sample Business",
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
      title: 'Free Coffee Card',
      description: "This is a sample stamp card",
      progressionText: "",
      redemptionText: "",
      stampsRequired: 10,
      createdAt: new Date(),
      business: {
        id: "1",
        name: "Sample Business",
      }
    },
    stampRecords: []
  }
]

export const StampCardStory: Story = {
  args: {
    stampCard: STAMP_CARDS[0],
  }
}