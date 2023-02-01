import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const [newGroup, setNewGroup] = useState('');

  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate('players', { group: newGroup });
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
