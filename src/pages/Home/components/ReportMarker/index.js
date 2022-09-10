import { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import { CustomMarker, Pointer } from './styles'

const ReportMarker = ({ report }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('ReportDetails', report);
  };

  return (
    <Marker
      coordinate={{ latitude: report.latitude, longitude: report.longitude }}
      onPress={() => handleNavigation()}
    >
      <CustomMarker>
        <Pointer />
      </CustomMarker>
    </Marker>
  );
}

export default ReportMarker;