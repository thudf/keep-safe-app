import { Container, ButtonText } from './styles';

const Button = ({ color = "", children, ...rest }) => (
  <Container color={color} {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;