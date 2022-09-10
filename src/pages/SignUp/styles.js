import styled from 'styled-components/native';
import { Dimensions } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper';

const screenHeight = Dimensions.get('screen').height;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #292929;
  padding: ${screenHeight/5}px 30px ${32 + getBottomSpace()}px;
`;

export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 64px;
`;

export const Title = styled.Text`
  font-size: 34px;
  font-weight: bold;
  color: #FFF;
`;

export const FormContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const LoaderContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(41, 41, 41, 0.9);
  align-items: center;
  justify-content: center;
`;