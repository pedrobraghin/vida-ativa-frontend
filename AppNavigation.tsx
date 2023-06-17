import notifee from "@notifee/react-native";
import { enableScreens } from "react-native-screens";

import { useUser } from "./src/hooks/useUser";
import { AccountTypes } from "./src/@types/UserType";

import AuthNavigation from "./src/screens/AuthNavigation";
import ElderlyNavigation from "./src/screens/elderly/RootNavigation";
import CaregiverNavigation from "./src/screens/caregiver/RootNavigation";

enableScreens(true);
export default function AppNavigation() {
  const { user, isLoggedIn } = useUser();

  if (!user || !isLoggedIn) {
    return <AuthNavigation />;
  }

  notifee.setBadgeCount(0);

  const { accountType } = user;

  if (accountType === AccountTypes.CAREGIVER) {
    return <CaregiverNavigation />;
  }

  return <ElderlyNavigation />;
}
