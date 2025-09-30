import { AuthProvider, useAuth } from "@/lib/context/auth";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

/**
 * A route guard that checks user is authenticated.
 * If not authenticated, redirect to home page. 
 */
function AuthenticatedUserRouteGuard(
  { children }: { children: React.ReactNode }
) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();

  useEffect(() => {
    console.info("AuthenticatedUserRouteGuard", user)
    if (!user && !isLoadingUser) {
      console.info("Redirecting to login")
      router.replace("/(auth)/login");
    }
  }, [user]);

  return <>{children}</>
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <AuthenticatedUserRouteGuard>
          <Stack>
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
          </Stack>
        </AuthenticatedUserRouteGuard>
      </PaperProvider>
    </AuthProvider>
  );
}
