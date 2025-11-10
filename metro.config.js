// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withStorybook } = require("@storybook/react-native/metro/withStorybook");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

/** withStorybook Adds the config that storybook uses */
module.exports = withStorybook(config);