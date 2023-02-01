import { ButtonIcon } from '@components/ButtonIcon';
import { Container, Name, Icon } from './styles';

interface PlayerCardProps {
  playerName: string;
  onRemove: () => void;
}

export function PlayerCard({ playerName, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{playerName}</Name>
      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  );
}
