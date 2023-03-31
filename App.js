import 'expo-dev-client';
import React from "react"
import { mapping, light, dark } from "@eva-design/eva"
import { View, Platform, StatusBar } from "react-native"
import { ApplicationProvider } from "@ui-kitten/components"
import { default as theme } from "./theme.json" // <-- Import app theme, generated with https://colors.eva.design/
import EditPersonalInfo from './src/features/EditPersonalInfo';

// sauce for status bar code: https://github.com/expo/expo/issues/3874#issuecomment-481459231
StatusBar.setBarStyle("dark-content")
if (Platform.OS === "android") {
  StatusBar.setTranslucent(true)
  StatusBar.setBackgroundColor("transparent")
}

export default () => {
  const customMapping = {
    ...mapping,
    strict: {
      ...mapping.strict,
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ApplicationProvider
        mapping={customMapping}
        theme={{ ...light, ...theme }}
      >
        <EditPersonalInfo />
      </ApplicationProvider>
    </View>
  )
}
