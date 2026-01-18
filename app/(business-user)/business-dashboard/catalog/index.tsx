import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { BodyText, HeaderText, ListCard, ListRow } from "@/design-system";
import { CatalogItem } from "@/lib/api/business-resource/business-resource.types";
import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { router } from "expo-router";
import { Text, View } from "react-native";


export default function CatalogPage() {

  const { activeBusinessRole } = useBusinessMembershipContext();
  const { catalogItems, loadingCatalogItems } = useBusinessResourceContext();

  if (!activeBusinessRole) {
    return;
  }

  return (
    <View className="flex-1 px-4 py-6">

      {/* Header */}
      <HeaderText level={1} className="mb-1">
        Catalog
      </HeaderText>
      <BodyText className="mb-6">
        Items offered by {activeBusinessRole.business.name}
      </BodyText>

      {/* Loading state */}
      {loadingCatalogItems && (
        <View className="mt-10 items-center">
          <LoadingOverlay />
        </View>
      )}

      {/* Empty state */}
      {!loadingCatalogItems && catalogItems.length === 0 && (
        <View className="mt-10 items-center">
          <Text className="text-gray-600">No items yet</Text>
        </View>
      )}

      {/* List */}
      {!loadingCatalogItems && catalogItems.length > 0 && (
        <ListCard>
          {catalogItems.map((item: CatalogItem, index: number) => (
            <ListRow
              key={item.name}
              title={item.name}
              subtitle={item.description}
              onPress={() =>
                console.debug(`item=${item.id}`)
                // router.push(
                //   // `/(business-user)/business-dashboard/catalog/${encodeURIComponent(item.name)}`
                // )
              }
              showDivider={index < catalogItems.length - 1}
            />
          ))}
        </ListCard>
      )}

    </View>
  )

}
