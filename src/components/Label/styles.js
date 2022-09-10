import styled, { css } from 'styled-components/native';

export const LabelContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  justify-content: ${props =>
    props.textAlign === 'center' ? 'center' : 'flex-start'};
  height: 24px;
`;

export const LabelText = styled.Text`
  font-size: 14px;
  line-height: 24px;
  color: #AFB0B2;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  ${(props) =>
    props.isFocused &&
    css`
      color: #566DE3;
    `}
  ${(props) =>
    props.isErrored &&
    css`
      color: #c53030;
    `}
`;
