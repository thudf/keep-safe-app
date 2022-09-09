import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup';

import Input from '../../components/Input'
import Button from '../../components/Button';
import Label from '../../components/Label'

import { Container, TitleContainer, Title, FormContainer, AddressContainer } from './styles';

const NewReport = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Container>
            <TitleContainer>
              <Title>Nova Ocorrência</Title>
            </TitleContainer>

            <FormContainer>
              <Label label={"Data"} />
              <Input />

              <Label label={"Hora"} />
              <Input />

              <Label label={"Instituição"} />
              <Input />

              <Label label={"Descrição"} />
              <Input
                multiline={true}
                numberOfLines={4}
              />
            </FormContainer>

            <AddressContainer>
              <Label label={"Logradouro"} />
              <Input />

              <Label label={"Número"} />
              <Input />

              <Label label={"Bairro"} />
              <Input />

              <Label label={"Cidade"} />
              <Input />

              <Label label={"Estado"} />
              <Input />

              <Label label={"CEP"} />
              <Input />
            </AddressContainer>

            <Button
              activeOpacity={0.8}
              onPress={() => {
                handleSignIn();
              }}
            >
              Salvar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
    
  );
}

export default NewReport;