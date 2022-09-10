import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../../../components/Button';

import {Container, Scroll, Title, Row} from './styles';

const CreateReportSuccess = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name={'check-circle'} color={'#566DE3'} size={80} />
        <Title style={{marginTop: 25}}>Sua ocorrência foi</Title>
        <Title>criada!</Title>
        <Row>
          <Button
            activeOpacity={0.8} 
            style={{marginTop: 80}}
            buttonColor={'#566DE3'}
            textColor={'#FFF'}
            onPress={() => navigation.navigate('Home')}>
            Ir para Home
          </Button>
        </Row>
      </Scroll>
    </Container>
  );
};

export default CreateReportSuccess;
