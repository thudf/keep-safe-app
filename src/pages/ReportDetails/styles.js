import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const screenHeight = Dimensions.get('screen').height;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: #292929;
  padding: ${screenHeight/8}px 30px ${64 + getBottomSpace()}px;
`;

export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 32px;
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
  margin-bottom: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
`;

export const Col = styled.View`
  align-items: center;
  justify-content: center;
  width: 48%;
`;