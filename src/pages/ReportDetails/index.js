import { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location'

import PageLoader from '../../components/PageLoader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, TitleContainer, Title, FormContainer, Row, Col } from './styles';

const ReportDetails = ({ route: { params } }) => {
  const { 
    latitude, 
    longitude, 
    datetime,
    title,
    description,
  } = params;

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);

  const getFormattedDate = useCallback(() => {
    const fullDate = new Date(datetime);
    const day = fullDate.getUTCDate();
    const month = (fullDate.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = fullDate.getUTCFullYear();
    const date = `${day}/${month}/${year}`;
    const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;

    return { date, time };
  }, [datetime]);

 const getReportAddress = useCallback(async () => {
  const [ response ] = await Location.reverseGeocodeAsync({ latitude, longitude });
  setAddress(response);
  setLoading(false);
 }, [latitude, longitude]);

  useEffect(() => {
    if (isFocused) {
      getReportAddress();
    }

    if (!isFocused) {
      setLoading(true);
    }
  }, [isFocused]);

  if (loading) return <PageLoader />;

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, position: 'relative' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Container>
            <TitleContainer>
              <Title>Ocorrência</Title>
            </TitleContainer>

            <FormContainer>
              <Input
                disabled
                label="Título"
                value={title}
              />

              <Row>
                <Col>
                  <Input
                    disabled
                    label="Data"
                    value={getFormattedDate().date}
                  />
                </Col>


                <Col>
                  <Input
                    disabled
                    label="Hora"
                    value={getFormattedDate().time}
                  />
                </Col>
              </Row>

              <Input
                disabled
                label="Descrição"
                value={description}
              />

              <Input
                disabled
                label="Logradouro"
                value={address?.street}
              />

              <Input
                disabled
                label="Número"
                value={address?.streetNumber}
              />

              <Input
                disabled
                label="Bairro"
                value={address?.district}
              />

              <Input
                disabled
                label="Cidade"
                value={address?.subregion}
              />

              <Input
                disabled
                label="Estado"
                value={address?.region}
              />

              <Input
                disabled
                label="País"
                value={address?.country}
              />
            </FormContainer>

            <Button
              color={loading ? '#666360' : '#566DE3'}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Home')}
            >
              Ir para Home
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default ReportDetails;