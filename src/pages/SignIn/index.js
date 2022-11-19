import React, { useCallback, useRef, useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import SocialButton from '../../components/SocialButton'

import logoImg from '../../../assets/logo.png';

import {
  Container,
  Logo,
  CreateAccount,
  CreateAccountText,
  CreateText,
  OrContainer,
  OrComponent,
  OrText,
  SocialLoginContainer,
} from './styles';

const SignIn = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const { 
    control, 
    getValues,
  } = useForm({ defaultValues: { email: '', password: '' } })

  const [errors, setErrors] = useState({});

  const passwordInputRef = useRef(null);
  const scrollViewRef = useRef();

  const setError = (error) => setErrors(errors => ({ ...errors, ...error }))
  const clearErrors = () => setErrors({})

  const handleEmailBlur = useCallback(
    async () => {
      try {
        clearErrors("email")
        const { email } = getValues()
        const data = { email: email }

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });
    
        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          Object.keys(errors).forEach(error => {
            if (error === "email") {
              setError({ [error]: errors[error] })
            }
          });
        }
      }
    },
    [],
  );

  const handlePasswordBlur = useCallback(
    async () => {
      try {
        clearErrors("password")
        const { password } = getValues()
        const data = { password: password }

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
        });
    
        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          Object.keys(errors).forEach(error => {
            if (error === "password") {
              setError({ [error]: errors[error] })
            }
          });
        }
      }
    },
    [],
  );

  const handleSignIn = useCallback(
    async () => {
      try {
        clearErrors();
        const data = getValues();

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
    
        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
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

        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login');
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Container>
            <Logo source={logoImg} style={{ resizeMode: 'contain' }} />

            <>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value  } }) => (
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    icon="mail"
                    placeholder="E-mail"
                    returnKeyType="next"
                    onChange={onChange}
                    onBlur={() => {
                      handleEmailBlur();
                      onBlur();
                    }}
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
                    onBlur={() => {
                      handlePasswordBlur();
                      onBlur();
                    }}
                    value={value}
                    error={errors.password}
                    onSubmitEditing={() => {
                      handleSignIn();
                    }}
                  />
                )}
              />

              <Button
                activeOpacity={0.8}
                onPress={() => {
                  handleSignIn();
                }}
              >
                Entrar
              </Button>

              <CreateAccount
                onPress={() => navigation.navigate('SignUp')}
              >
                <CreateAccountText>Não tem uma conta?</CreateAccountText>
                <CreateText>Crie agora</CreateText>
              </CreateAccount>
            </>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
