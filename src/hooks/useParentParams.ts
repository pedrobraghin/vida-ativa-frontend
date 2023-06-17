import { useNavigation } from "@react-navigation/native";

export function useParentParams<T>(screenName: string) {
  const navigation = useNavigation();
  const parent = navigation.getParent();

  if (!parent) return null;

  const state = parent.getState();
  const routes = state.routes;

  const params = routes.find((r) => r.name === screenName)?.params as T;

  return params;
}
