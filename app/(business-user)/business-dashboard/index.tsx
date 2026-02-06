import { Section, SectionCard, SectionRow } from "@/design-system";
import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";


function SectionWithRows({
  title,
  subtitle,
  rows,
}: {
  title: string
  subtitle?: string
  rows: {
    icon: React.ReactNode
    label: string
    onPress?: () => void
  }[]
}) {
  return (
    <Section title={title} subtitle={subtitle}>
      <SectionCard>
        {rows.map((row, index) => (
          <SectionRow
            key={row.label}
            icon={row.icon}
            label={row.label}
            onPress={row.onPress}
            showDivider={index < rows.length - 1}
          />
        ))}
      </SectionCard>
    </Section>
  )
}


export default function BusinessScreen() {
  const { activeBusinessRole } = useBusinessMembershipContext()
  const { stampPrograms } = useBusinessResourceContext()

  if (!stampPrograms || !activeBusinessRole) {
    return null
  }

  const business = activeBusinessRole.business

  return (
    <View className="flex-1 px-4 py-6">

      {/* Business details */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-gray-900">
          {business.name}
        </Text>
        <Text className="text-md text-gray-900">
          {business.description}
        </Text>
      </View>

      <SectionWithRows
        title="Catalog"
        subtitle="View catalog of items offered"
        rows={[
          {
            icon: <FontAwesome5 name="book-open" size={28} color="#374151" />,
            label: "Catalog",
            onPress: () => router.push("/(business-user)/business-dashboard/catalog"),
          },
        ]}
      />

      <SectionWithRows
        title="Offers"
        subtitle="View available offers"
        rows={[
          {
            icon: <FontAwesome5 name="tags" size={28} color="#374151" />,
            label: "Offers",
            onPress: () => router.push("/(business-user)/business-dashboard/offers"),
          },
        ]}
      />

      <SectionWithRows
        title="Available Rewards"
        subtitle="Select a reward type to issue"
        rows={[
          {
            icon: <FontAwesome5 name="stamp" size={28} color="#374151" />,
            label: "Stamps",
            onPress: () => router.push("/(business-user)/business-dashboard/stamp-programs"),
          },
          {
            icon: <FontAwesome5 name="coins" size={28} color="#374151" />,
            label: "Points",
            onPress: () => { },
          },
        ]}
      />

    </View>
  )
}


