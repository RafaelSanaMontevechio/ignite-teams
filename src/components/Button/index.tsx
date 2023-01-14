import { TouchableOpacityProps } from 'react-native';

import { ButtonText, ButtonTypeStyleProps, Container } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  type?: ButtonTypeStyleProps;
}

export function Button({ text, type = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <Container type={type} {...rest}>
      <ButtonText>{text}</ButtonText>
    </Container>
  );
}
