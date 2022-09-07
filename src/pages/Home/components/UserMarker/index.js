import { Marker } from 'react-native-maps';

import { CustomMarker, Pointer } from './styles'

const UserMarker = ({ coordinate }) => {
  return (
    <Marker
      coordinate={{ ...coordinate }}
      tappable={false}
    >
      <CustomMarker>
        <Pointer />
      </CustomMarker>
    </Marker>
  );
}

export default UserMarker;