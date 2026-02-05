import { Meta, StoryObj } from "@storybook/react-native";
import { StampCardListItem } from "./index";

const meta = {
  component: StampCardListItem,
} satisfies Meta<typeof StampCardListItem>;

export default meta;
export const StampCardStory: StoryObj<typeof meta> = {
  args: {
    stampCard: {
      id: '1',
      state: "in_progress",
      createdAt: new Date(),
      stampProgram: {
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
    },
  }
}