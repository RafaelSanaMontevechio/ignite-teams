import { Container, Logo } from './styles';

import logoImage from '@assets/logo.png';

export function Header() {
  return (
    <Container>
      <Logo source={logoImage} />
    </Container>
  );
}
