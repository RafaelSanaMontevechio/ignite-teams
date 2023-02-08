import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { playerGetByGroup } from './playerGetByGroup';

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storedGroups = await playerGetByGroup(group);

    const filtered = storedGroups.filter(
      (player) => player.name !== playerName,
    );

    const players = JSON.stringify(filtered);

    AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch (error) {
    throw error;
  }
}
