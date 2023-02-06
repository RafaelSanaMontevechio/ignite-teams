import { useState, useEffect, useCallback } from 'react';

import { FlatList } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { groupGetAll } from '@storage/group/groupGetAll';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { EmptyList } from '@components/EmptyList';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  const fetchGroups = async () => {
    try {
      const data = await groupGetAll();

      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewGroup = () => {
    navigation.navigate('newGroup');
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, []),
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={<EmptyList message="Nenhuma turma criada" />}
      />

      <Button text="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
