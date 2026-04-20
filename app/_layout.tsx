// Made by Shovith (Sid)
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0A0A0A', // Deep midnight background
          },
          headerTintColor: '#FFFFFF',
          contentStyle: {
            backgroundColor: '#0A0A0A',
          },
          headerShadowVisible: false, // Removes the header border for a cleaner look
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Dashboard', headerShown: false }} />
        <Stack.Screen name="scanner" options={{ title: 'Scan Receipt', presentation: 'modal' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
});
