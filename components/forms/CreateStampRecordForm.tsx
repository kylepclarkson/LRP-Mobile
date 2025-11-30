import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { EmployeeGroup, getEmployeeGroupLabel, getStampDefinitionLabel, StampDefinition } from "@/types/types";
import React, { JSX, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CurrencyInput } from "./CurrencyInput";
import { FormSelectable } from "./FormSelectable";

type Props = {
  onOpen: (renderContent: () => JSX.Element) => void;
  onClose: () => void;
}

export default function CreateStampRecordForm({ onOpen, onClose }: Props) {
  const { user } = useAuthContext();
  const {
    activeEmployeeGroup,
    setActiveEmployeeGroup,
    activeStampDefinition,
    setActiveStampDefinition,
    stampDefinitions
  } = useBusinessContext();

  const [currencyValue, setCurrencyValue] = useState<{ value: number, isValid: boolean }>({
    value: 0,
    isValid: true,
  });
  
  const formIsValid = ():boolean => {
    return currencyValue.isValid
  }

  const onCreateStampRecord = () => {
    if (!formIsValid) {
      return;
    }
    console.debug(`onCreateStampRecord - businessId=${activeStampDefinition?.business.id}, stampDefinitionId=${activeStampDefinition?.id}, currencyValue=${currencyValue.value}`)
  }

  return (
    <View className="flex-1 space-y-6">
      {activeEmployeeGroup && <FormSelectable<EmployeeGroup>
        label="Active employee group"
        placeholder="Select an employee group"
        activeItem={activeEmployeeGroup}
        data={user!.employeeGroups}
        getLabel={getEmployeeGroupLabel}
        onSelect={(item) => {
          setActiveEmployeeGroup(item);
          onClose();
        }}
        onOpen={onOpen}
      />}
      {(activeStampDefinition && stampDefinitions) && <FormSelectable<StampDefinition>
        label="Active stamp record"
        placeholder="Select a stamp definition"
        activeItem={activeStampDefinition}
        data={stampDefinitions}
        getLabel={getStampDefinitionLabel}
        onSelect={(item) => {
          setActiveStampDefinition(item);
          onClose();
        }}
        onOpen={onOpen}
      />}
      <CurrencyInput
        label="Transaction amount"
        onUpdate={({ value, isValid }) => setCurrencyValue({ value, isValid })}
      />
      <View className="items-center mt-4">
        <Pressable className="px-6 py-3 bg-blue-600 rounded-md" onPress={onCreateStampRecord}>
          <Text className="text-white font-semibold">Create stamp record</Text>
        </Pressable>
      </View>

    </View>
  )
}