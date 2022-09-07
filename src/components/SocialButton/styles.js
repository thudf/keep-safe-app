import styled from 'styled-components/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: ${props => (props.color ? props.color : '#FFFFFF')};
  border-radius: 6px;
  margin-bottom: 16px;
  padding: 10px 16px;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: #c2c2c2;
`;

export const Icon = styled(FontAwesome5Icon)`
  margin-right: 16px;
`;

export const Text = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-left: 16px;
  color: ${props => (props.color ? props.color : '#FFFFFF')};
`;
