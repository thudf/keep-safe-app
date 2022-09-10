import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import * as WebBrowser from 'expo-web-browser';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as signOutFirebase,
} from 'firebase/auth';

import firebaseConfig from '../../config/firebase';

const AuthContext = createContext({});

initializeApp(firebaseConfig);

WebBrowser.maybeCompleteAuthSession();
LogBox.ignoreAllLogs();

const auth = getAuth();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const setStorageItem = async (user) => {
    await AsyncStorage.setItem('@KeepSafe:user', JSON.stringify(user));
    setData({ user });
  };

  const removeStorageItem = async () => {
    await AsyncStorage.removeItem('@KeepSafe:user');
    setData(null);
  };

  useEffect(() => {
    async function loadStorageData() {
      const user = await AsyncStorage.getItem('@KeepSafe:user');

      if (user) {
        setData({ user: JSON.parse(user) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setStorageItem(user);
      } else {
        removeStorageItem();
      }
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signOut = useCallback(async () => {
    await signOutFirebase(auth);
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        user: data?.user, 
        loading, 
        signIn, 
        signOut 
      }}
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