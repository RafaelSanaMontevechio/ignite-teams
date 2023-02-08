import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';

import { PLAYER_COLLECTION } from '../storageConfig';
import { playerGetByGroup } from './playerGetByGroup';

import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function playerAddByGroup(
  player: PlayerStorageDTO,
  group: string,
) {
  try {
    const storedPlayers = await playerGetByGroup(group);

    const playerAlreadyInGroup = storedPlayers.filter(
      (p) => p.name === player.name,
    );

    if (playerAlreadyInGroup.length > 0) {
      throw new AppError('Player already in group');
    }

    const storage = JSON.stringify([...storedPlayers, player]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
