import styled from 'styled-components/native';
import { Dimensions } from 'react-native'

const screenHeight = Dimensions.get('screen').height;

export const CenterMapContainer = styled.View`
  position: absolute;
  bottom: ${screenHeight/5 * 1}px;
  transform: translateY(18px);
  align-self: center;
`;

export const CenterMapButton = styled.TouchableOpacity`
  background-color: #566DE3;
  padding: 10px 14px;
  border-radius: 6px;
`;

export const CenterMapText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #FFF;
`;