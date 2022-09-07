import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const screenHeight = Dimensions.get('screen').height;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${32 + getBottomSpace()}px;
`;

export const Logo = styled.Image`
  max-width: 85%;
  height: 100px;
  margin-top: ${(screenHeight/4 - 30)}px;
  margin-bottom: 32px;
`

export const CreateAccount = styled.TouchableOpacity`
  margin-top: 8px;
  margin-bottom: 15px;
  padding-right: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CreateAccountText = styled.Text`
  font-size: 16px;
  color: #DDDDDD;
`;

export const CreateText = styled.Text`
  font-size: 16px;
  color: #566DE3;
  padding-left: 4px;
`;

export const OrContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
`;

export const OrComponent = styled.View`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid #DDDDDD;
`;

export const OrText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #DDDDDD;
`;

export const SocialLoginContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  margin-top: 42px;
`;
