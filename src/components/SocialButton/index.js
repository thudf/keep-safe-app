import useSocialButton from './useSocialButton';

import { Container, IconContainer, Icon, Text } from './styles';

const Button = ({ type, ...rest }) => {
  const { buttonProps } = useSocialButton(type);

  return (
    <Container 
      color={buttonProps.containerColor} 
      activeOpacity={0.9}
      onPress={() => buttonProps.handlePress()}
      {...rest}
    >
      <IconContainer>
        <Icon
          name={buttonProps.icon}
          size={30}
          color={buttonProps.iconColor}
        />
      </IconContainer>
      <Text color={buttonProps.textColor}>
        {`Entrar com ${buttonProps.title}`}
      </Text>
    </Container>
  );
};

export default Button;