import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #292929;
`;

export const Map = styled(MapView)`
  height: ${screenHeight}px;
  width: ${screenWidth}px;
`;