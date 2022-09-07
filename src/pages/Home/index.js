import { View, Text, TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/auth'

const Home = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
      <Text>HOME</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;