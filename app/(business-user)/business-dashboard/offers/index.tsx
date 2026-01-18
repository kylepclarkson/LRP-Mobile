import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { BodyText, HeaderText, ListCard, ListRow } from "@/design-system";
import { OfferDefinition } from "@/lib/api/business-resource/business-resource.types";
import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { Text, View } from "react-native";


export default function OffersScreen() {

  const { activeBusinessRole } = useBusinessMembershipContext();
  const { offerDefinitions, loadingOfferDefinitions } = useBusinessResourceContext();

  if (!activeBusinessRole) {
    return;
  }

  return (
    <View className="flex-1 px-4 py-6">

      {/* Header */}
      <HeaderText level={1} className="mb-1">
        Offers
      </HeaderText>
      <BodyText className="mb-6">
        Available offers for {activeBusinessRole.business.name}
      </BodyText>

      {/* Loading */}
      {loadingOfferDefinitions && (
        <View className="mt-10 items-center">
          <LoadingOverlay />
        </View>
      )}

      {/* Empty state */}
      {!loadingOfferDefinitions && offerDefinitions.length === 0 && (
        <View className="mt-10 items-center">
          <Text className="text-gray-600">No offers defined yet</Text>
        </View>
      )}

      {/* List */}
      {!loadingOfferDefinitions && offerDefinitions.length > 0 && (
        <ListCard>
          {offerDefinitions.map((offer: OfferDefinition, index: number) => (
            <ListRow
              key={offer.id}
              title={offer.title}
              subtitle={offer.description}
              onPress={() =>
                console.debug(`offerDefinitionId=${offer.id}`)
                // router.push(
                //   `/(business-user)/business-dashboard/offers/${offer.id}`
                // )
              }
              showDivider={index < offerDefinitions.length - 1}
            />
          ))}
        </ListCard>
      )}

    </View>
  )

}