# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start --tunnel
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## EAS build

To trigger a development build.
1. Confirm credentials with EAS: `eas whoami`
1. Create build request (for Android) `eas build --profile development --platform android`


## App styling

This project uses Tailwind V4 for styling through NativeWind V5 integration. 
The app attempts to provide consistent design through a collection of components within the [/design-system/](./design-system/) directory.
When appropriate screens should utilize these components to provide consistent styling. 

For UI styling like colors, radius, etc. themes are defined the theme provider class. 
The philosophy for Aandeg's styles is based on themes provided by daisyUI - https://daisyui.com/theme-generator/

### Colors

- **base** colors provide the "background" for screens, pages, and components. It ranges from 100, 200, and 300 variants for different types of background - from lighter to darker - providing a sense of layers. 
- **content** - colors are paired with other background colors (e.g. base, primary, secondary, etc.) and can be used for rendering text on top of these colors.  



