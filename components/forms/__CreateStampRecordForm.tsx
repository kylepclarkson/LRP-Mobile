import { useAuthContext } from "@/lib/context/auth";
import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { CreateStampCardRequest, CreateStampCardResponse, createStampRecord } from "@/lib/services/stamps.service";
import { StampDefinition } from "@/types/stamps";
import { getStampDefinitionLabel } from "@/types/types";
import React, { JSX, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { CurrencyInput } from "./CurrencyInput";
import { FormSelectable } from "./FormSelectable";

type Props = {
  onOpen: (renderContent: () => JSX.Element) => void;
  onClose: () => void;
}

type CurrencyData = {
  value: number;
  isValid: boolean;
}

export default function CreateStampRecordForm({ onOpen, onClose }: Props) {
  const { user } = useAuthContext();
  const {
    activeStampDefinition,
    setActiveStampDefinition,
    stampDefinitions
  } = useBusinessMembershipContext();

  const DEFAULT_CURRENCY_DATA: CurrencyData = { value: 0, isValid: true };

  const [currencyData, setCurrencyData] = useState<CurrencyData>(DEFAULT_CURRENCY_DATA);

  const [createStampCardResponse, setCreateStampCardResponse] = useState<CreateStampCardResponse | null>(null);

  const [formIsValid, setFormIsValid] = useState<boolean>(true);

  useEffect(() => {
    console.debug("useEffect called")
    setFormIsValid(validateFormData())
  }, [currencyData])

  const validateFormData = (): boolean => {
    return currencyData.isValid
  }

  const handleCreateStampRecordPress = async () => {
    const req: CreateStampCardRequest = {
      stampDefinitionId: activeStampDefinition!.id,
      transaction: {
        amount: currencyData.value,
        currencyCode: "CAD"
      }
    }
    const makeRequest = async (): Promise<CreateStampCardResponse> => {
      return await createStampRecord(req);
    }
    if (formIsValid) {
      setCurrencyData(DEFAULT_CURRENCY_DATA);
      const response = await makeRequest();
      console.debug("response from creating StampRecord=", response)
      setCreateStampCardResponse(response);
    } else {
      console.debug("form is not valid");
    }
  }

  const handleCreateNewStampRecord = () => {
    setCreateStampCardResponse(null);
  }

  return (
    <View className="flex-1 space-y-6">
      {createStampCardResponse ? (
        <>
          <View className="items-center mt-8">
            <QRCode
              value={String(`${createStampCardResponse.stampRecordId}`)}
              size={200}
              color="black"
            />
          </View>
          <View className="items-center mt-4">
            <Pressable className="px-6 py-3 bg-blue-600 rounded-md" onPress={handleCreateNewStampRecord}>
              <Text className="text-white font-semibold">Create new stamp record</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          {/* {activeEmployeeGroup && <FormSelectable<EmployeeGroup>
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
          />} */}
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
            onUpdate={({ value, isValid }) => setCurrencyData({ value, isValid })}
          />
          <View className="items-center mt-4">
            <Pressable className="px-6 py-3 bg-blue-600 rounded-md" onPress={handleCreateStampRecordPress}>
              <Text className="text-white font-semibold">Create stamp record</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  )
}