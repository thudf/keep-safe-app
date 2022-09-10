import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  padding: 10px 16px;
  background: #DDDDDD;
  border-radius: 6px;
  border-width: 2px;
  border-color: #292929;
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.isDisabled &&
    css`
      padding: 10px 4px;
      margin-bottom: 6px;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: #566DE3;
    `}
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #292929;
  font-size: 16px;
`;

export const Text = styled.Text`
  flex: 1;
  color: #292929;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 12px;
`;

export const Error = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 15px;
  margin-top: 2px;
  margin-bottom: 4px;
  padding-right: 8px;
`;

export const ErrorText = styled.Text`
  font-size: 11px;
  color: #c53030;
`;