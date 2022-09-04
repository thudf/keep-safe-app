import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const [token, user] = await AsyncStorage.multiGet([
        '@KeepSafe:token',
        '@KeepSafe:user',
      ]);

      if (token[1] && user[1]) {
        // api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    // const response = await api.post('sessions', {
    //   email,
    //   password,
    // });

    console.log('sigIn_email: ', email)
    console.log('sigIn_senha: ', password)

    const response = { token: "12345", user: { nome: "Teste", email: "teste@teste.com" } }

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@KeepSafe:token', token],
      ['@KeepSafe:user', JSON.stringify(user)],
    ]);

    // api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@KeepSafe:token', '@KeepSafe:user']);

    setData({});
  }, []);

  const updateUser = useCallback(
    async (user) => {
      await AsyncStorage.setItem('@KeepSafe:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
