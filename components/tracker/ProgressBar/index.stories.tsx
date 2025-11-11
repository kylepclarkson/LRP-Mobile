import { ProgressBar } from ".";

export default {
  component: ProgressBar,
  title: "ProgressBar"
};

export const Default = {
  args: {
    progress: 65,
  }
}

export const WithColor = {
  args: {
    progress: 40,
    fillColor: '#24dd2aff',
  }
}

