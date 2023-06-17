import AsyncStorage from "@react-native-async-storage/async-storage";

async function retrieveItem(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    return null;
  }
}

async function setItem(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default function useLocalStorage() {
  return { retrieveItem, setItem };
}
