import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 12px 0;
  background: ${props =>
    props.color ? props.color : '#566DE3'};
  border-radius: 6px;
  margin-top: 6px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #DDDDDD;
  font-size: 18px;
  font-weight: bold;
`;
