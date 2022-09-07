import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;

export const CenterMapContainer = styled.View`
  position: absolute;
  top: ${(screenHeight/4) * 3}px;
  align-self: center;
`;

export const CenterMapButton = styled.TouchableOpacity`
  background-color: #566DE3;
  padding: 12px 16px;
  border-radius: 6px;
`;

export const CenterMapText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #FFF;
`;