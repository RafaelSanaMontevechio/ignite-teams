import { useState } from 'react';

import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { groupCreate } from '@storage/group/groupCreate';

import { AppError } from '@utils/AppError';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const [newGroup, setNewGroup] = useState('');

  const navigation = useNavigation();

  const handleNewGroup = async () => {
    try {
      if (newGroup.trim().length === 0) {
        return Alert.alert('Novo group', 'Informe o nome da turma');
      }

      await groupCreate(newGroup);
      navigation.navigate('players', { group: newGroup });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo group', error.message);
      } else {
        Alert.alert('Novo group', 'Não foi possível criar o novo grupo');
      }
    }
  };

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight title="Nova turma" subtitle="Crie a turma" />

        <Input placeholder="Nome da turma" onChangeText={setNewGroup} />

        <Button
          text="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
}
