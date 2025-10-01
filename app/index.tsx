import { useAuthSession } from "@/lib/context/auth";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {

  const { user, isLoadingUser, login, logout } = useAuthSession();

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
