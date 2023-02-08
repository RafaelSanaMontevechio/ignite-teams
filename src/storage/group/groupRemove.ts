import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';

import { groupGetAll } from './groupGetAll';

export async function groupRemove(groupNameToDelete: string) {
  try {
    const storedGroups = await groupGetAll();

    const filteredGroups = storedGroups.filter(
      (group) => group !== groupNameToDelete,
    );

    const groups = JSON.stringify(filteredGroups);

    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupNameToDelete}`);
  } catch (error) {
    throw error;
  }
}
