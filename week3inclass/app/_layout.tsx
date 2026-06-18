
import 'react-native-reanimated';

import { Stack } from 'expo-router';
import React from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
