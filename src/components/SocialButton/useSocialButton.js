import { Alert } from 'react-native'
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { 
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

const useSocialButton = (type) => {

  const socialButtonProps = {
    google: {
      icon: 'Google',
      iconColor: '#566DE3',
      containerColor: '#FFFFFF',
      title: 'Google',
      textColor: '#FFFFFF',
      handlePress: () => promptAsyncGoogle(),
    },
    facebook: {
      icon: 'Facebook',
      iconColor: '#FFFFFF',
      containerColor: '#566DE3',
      title: 'Facebook',
      textColor: '#566DE3',
      handlePress: () => promptAsyncFacebook(),
    },
  };

  const [googleRequest, googleResponse, promptAsyncGoogle] = Google.useIdTokenAuthRequest(
    {
      clientId: '488002535677-rt4qkh3fladj8oqmio1qkqoqffpu35bp.apps.googleusercontent.com',
      },
  );

  useEffect(() => {
    if (googleResponse) {
      if (googleResponse?.type === 'success') {
        const { id_token } = googleResponse.params;
        
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential);
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login');
      }
    }
  }, [googleResponse]);

  const [facebookRequest, facebookResponse, promptAsyncFacebook] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '872227580423518',
  });

  useEffect(() => {
    if (facebookResponse) {
      if (facebookResponse?.type === 'success') {
        const { access_token } = facebookResponse.params;
        
        const auth = getAuth();
        const provider = new FacebookAuthProvider();
        const credential = provider.credential(access_token);
        signInWithCredential(auth, credential);
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login');
      }
    }
  }, [facebookResponse]);

  const buttonProps = socialButtonProps[type.toLowerCase()]

  return {
    buttonProps
  }

};

export default useSocialButton;