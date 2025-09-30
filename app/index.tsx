import { useAuth } from "@/lib/context/auth";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {

  const { user, isLoadingUser, login, logout } = useAuth();

  const handleClick = async () => {
    if (!user) {
      await login();
    } else {
      await logout();
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {user === undefined ? (
        <Text>Please sign in</Text>
      ) : (
        <Text>Welcome {user.first_name}</Text>
      )}
      <Button
        mode="contained"
        onPress={handleClick}
      >
        {user === undefined ? "Sign in" : "Sign out"}
      </Button>
    </View>
  );
}
