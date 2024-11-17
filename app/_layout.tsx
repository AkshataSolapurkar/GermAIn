import { Stack } from "expo-router";
import { AuthProvider } from "@/services/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
       <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
    </AuthProvider>
   
  );
}
