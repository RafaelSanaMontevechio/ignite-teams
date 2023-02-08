import { useEffect, useRef, useState } from 'react';

import { Alert, FlatList, TextInput, Keyboard } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { groupRemove } from '@storage/group/groupRemove';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';

import { AppError } from '@utils/AppError';

import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { EmptyList } from '@components/EmptyList';
import { Highlight } from '@components/Highlight';
import { PlayerCard } from '@components/PlayerCard';
import { ButtonIcon } from '@components/ButtonIcon';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();
  const navigation = useNavigation();

  const inputRef = useRef<TextInput>(null);

  const { group } = route?.params as RouteParams;

  const fetchPlayersByTeam = async () => {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert('Players', 'Não foi possível carregar os players');
    }
  };

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Novo player', 'Informe o nome do player');
    }

    try {
      const newPlayer = {
        name: newPlayerName,
        team: group,
      };

      await playerAddByGroup(newPlayer, group);
      await fetchPlayersByTeam();

      inputRef?.current?.blur();
      setNewPlayerName('');

      Keyboard.dismiss();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo player', error.message);
      } else {
        Alert.alert('Novo player', 'Não foi possível adicionar o novo player');
      }
    }
  };

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group);
      await fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Remover player', 'Não foi possível remover');
    }
  };

  const onGroupRemove = async () => {
    try {
      await groupRemove(group);

      navigation.navigate('groups');
    } catch (error) {
      Alert.alert('Remover grupo', 'Não foi possível remover o grupo');
    }
  };

  const handleRemoveGroup = async () => {
    Alert.alert('Remover grupo', 'Deseja remover o grupo?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: onGroupRemove,
      },
    ]);
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera os times" />

      <Form>
        <Input
          inputRef={inputRef}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          horizontal
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      <FlatList
        horizontal
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            playerName={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={<EmptyList message="Nenhuma player" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button text="Remover turma" type="DANGER" onPress={handleRemoveGroup} />
    </Container>
  );
}
