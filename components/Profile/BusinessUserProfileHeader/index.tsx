import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { Picker } from "@react-native-picker/picker";
import { styled } from "nativewind";
import { Text, View } from "react-native";
import { ProfileHeaderComponent } from "../ProfileHeaderComponent";

const StyledPicker = styled(Picker<string>);

/**
 * 
 */
export function EmployeeComponent() {

  const { user } = useAuthContext();
  const { activeBusinessRole, setActiveBusinessRole, userBusinessRoles } = useBusinessContext();

  if (!user || !activeBusinessRole) {
    return null;
  }

  const activeBusinessRoleText = `${activeBusinessRole.business.name} - ${activeBusinessRole.role.name}`;

  return (
    <View className="mx-2">
      <ProfileHeaderComponent />
      <View>
        <Text>{activeBusinessRoleText}</Text>
        <StyledPicker
          selectedValue={activeBusinessRole.id}
          className="border border-gray-300 rounded bg-white text-base"
          onValueChange={(value) => {
            const newActiveBusinessRole = userBusinessRoles.find(ubr => ubr.id === value);
            if (newActiveBusinessRole) {
              setActiveBusinessRole(newActiveBusinessRole);
            }
          }}
        >
          {userBusinessRoles.map((ubr, index) => (
            <Picker.Item key={index} label={`${ubr.business.name} - ${ubr.role.name}`} value={ubr.id} />
          ))}
        </StyledPicker>
      </View>
    </View>
  );
}