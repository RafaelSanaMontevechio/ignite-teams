import { useNavigation } from '@react-navigation/native';

import logoImage from '@assets/logo.png';

import { Container, Logo, BackButton, BackIcon } from './styles';

interface HeaderProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: HeaderProps) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('groups');
  };

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImage} />
    </Container>
  );
}
