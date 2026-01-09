import { PageHeader } from "@/components/common/PageHeader";
import { UserRewardBadge } from "@/components/common/UserRewardBadge";
import { CustomerProfileHeader } from "@/components/Profile/CustomerProfileHeader";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useIsFocused } from "@react-navigation/native";
import { JSX, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  
  return (
    <>
      <PageHeader headerText="Profile" />
      <CustomerProfileHeader />
    </>
  )
}
