import { Container, IconContainer, Icon, Text } from './styles';

const Button = ({ icon, iconColor, containerColor, ...rest }) => (
  <Container color={containerColor} activeOpacity={0.9} {...rest}>
    <IconContainer>
      <Icon
        name={icon.toLowerCase()}
        size={30}
        color={iconColor}
      />
    </IconContainer>
    <Text color={iconColor}>{`Entrar com ${icon}`}</Text>
  </Container>
);

export default Button;