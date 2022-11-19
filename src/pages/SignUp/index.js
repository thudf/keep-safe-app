import { useCallback, useRef, useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from 'yup';

import api from '../../services'
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input'
import Button from '../../components/Button';

import { Container, TitleContainer, Title, FormContainer, LoaderContainer } from './styles';

const NewReport = () => {
  const auth = getAuth();
  const { 
    control, 
    getValues,
  } = useForm({ defaultValues: { email: '', password: '' } });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({})

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleSignIn = useCallback(
    async () => {
      setLoading(true);
      try {
        setErrors({});
        const data = getValues();
        
        const schema = Yup.object().shape({
          name: Yup.string()
            .required('Nome obrigatório')
            .min(3, 'Nome deve conter ao menos 3 caracteres'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .min(6, 'Senha deve conter ao menos 6 caracteres')
            .required('Senha obrigatória'),
        });
    
        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, password } = data;

        await api.post('/user', data);
        await createUserWithEmailAndPassword(auth, email, password);
        
        setLoading(false);
      } catch (err) {
        console.log('err: ', err);
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          let errorsList = {}

          Object.keys(errors).forEach(error => {
            errorsList = {
              ...errorsList,
              [error]: errors[error]
            }
          });

          setErrors(errorsList)

          return;
        }

        Alert.alert('Erro', 'Ocorreu um erro ao criar a sua conta. Tenta mais tarde novamente!');
      }
    },
    [],
  );

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
              <Title>Criar Conta</Title>
            </TitleContainer>

            <FormContainer>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value  } }) => (
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="default"
                    icon="user"
                    placeholder="Nome"
                    returnKeyType="next"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.name}
                    onSubmitEditing={() => {
                      emailInputRef.current?.focus();
                    }}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value  } }) => (
                  <Input
                    ref={emailInputRef}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    icon="mail"
                    placeholder="E-mail"
                    returnKeyType="next"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.email}
                    onSubmitEditing={() => {
                      passwordInputRef.current?.focus();
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value  } }) => (
                  <Input
                    ref={passwordInputRef}
                    icon="lock"
                    placeholder="Senha"
                    returnKeyType="send"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.password}
                    onSubmitEditing={() => {
                      handleSignIn();
                    }}
                  />
                )}
              />

              <Button
                color={loading ? '#666360' : '#566DE3'}
                activeOpacity={0.8}
                onPress={() => {
                  if (!loading) {
                    handleSignIn();
                  }
                }}
              >
                Salvar
              </Button>
            </FormContainer>
          </Container>
        </ScrollView>

        {loading && (
          <LoaderContainer>
            <ActivityIndicator size="large" color="#999" />
          </LoaderContainer>
        )}
      </KeyboardAvoidingView>
    </>
    
  );
}

export default NewReport;