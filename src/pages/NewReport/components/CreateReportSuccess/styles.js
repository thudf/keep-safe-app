import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #292929;
  align-items: center;
  justify-content: flex-start;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #FFF;
`;

export const MainText = styled.Text`
  font-size: 16px;
  color: #FFF;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 50px;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: center;
  align-items: center;
`;
