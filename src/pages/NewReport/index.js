import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form'
import uuid from 'react-native-uuid';
import * as Location from 'expo-location';
import { getDatabase, ref, set } from "firebase/database";
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import api from '../../services';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input'
import Button from '../../components/Button';

import CreateReportSuccess from './components/CreateReportSuccess';

import { Container, TitleContainer, Title, FormContainer, LoaderContainer } from './styles';

const NewReport = () => {
  const db = getDatabase();
  const { user: { uid, email } } = useAuth();
  const { 
    control, 
    getValues,
    setValue,
  } = useForm({ defaultValues: { title: '', description: '' } });
  const isFocused = useIsFocused();
  

  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errors, setErrors] = useState({})

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const handleCreateReport = useCallback(
    async () => {
      Keyboard.dismiss();
      if (!loading) {
        try {
          setLoading(true);
          setErrors({});
          const data = getValues();
  
          const schema = Yup.object().shape({
            title: Yup.string()
              .required('Título obrigatório'),
            description: Yup.string()
              .required('Descrição obrigatória'),
          });
      
          await schema.validate(data, {
            abortEarly: false,
          });
  
  
          const currentDate = new Date();
  
          const { 
            coords: { latitude, longitude }
          } = await Location.getCurrentPositionAsync();
  
          if (latitude && longitude && uid && currentDate) {
            const reportId = uuid.v4();

            const { data: users } = await api.get('user');
            const { id: userId } = users.find(user => user.email === email);
            console.log('id: ', id);

            await api.post('issue', {
              description: data.description,
              latitude,
              longitude,
              issueTypeId: 1,
              issueStatusId: 1,
              userId
            });
  
            await set(ref(db, `reports/${reportId}`), {
              latitude,
              longitude,
              author_id: uid,
              title: data.title,
              description: data.description,
              datetime: currentDate.toString(),
            });
  
            setSuccessVisible(true);
            setLoading(false);
          } else {
            throw new Error('Dados insuficientes!')
          }
  
          setLoading(false);
        } catch (err) {
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
  
          Alert.alert('Erro', 'Ocorreu um erro ao salvar a ocorrência. Tenta mais tarde novamente!');
        }
      }
    },
    [loading],
  );

  useEffect(() => {
    if (isFocused) {
      titleInputRef.current?.focus();
    }

    if (!isFocused) {
      setSuccessVisible(false);
      setValue('title', '', { shouldValidate: true, shouldDirty: false, shouldTouch: false });
      setValue('description', '', { shouldValidate: true, shouldDirty: false, shouldTouch: false });
      setErrors({});
    }
  }, [isFocused]);

  if (successVisible) return <CreateReportSuccess />;

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, position: 'relative', backgroundColor: '#292929' }}
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
              <Controller
                name="title"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value  } }) => (
                  <Input
                    label="Título *"
                    ref={titleInputRef}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.title}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      descriptionInputRef.current?.focus();
                    }}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value  } }) => (
                  <Input
                    label={"Descrição *"}
                    ref={descriptionInputRef}
                    multiline={true}
                    numberOfLines={4}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.description}
                    returnKeyType="send"
                    onSubmitEditing={() => {
                      handleCreateReport();
                    }}
                  />
                )}
              />
            </FormContainer>

            <Button
              color={loading ? '#666360' : '#566DE3'}
              activeOpacity={0.8}
              onPress={() => {
                handleCreateReport();
              }}
            >
              Salvar
            </Button>
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