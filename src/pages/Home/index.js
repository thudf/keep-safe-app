import PageLoader from '../../components/PageLoader';
import CenterMap from './components/CenterMap';
import UserMarker from './components/UserMarker';

import useHome from './useHome';

import { Container, Map } from './styles';

const Home = () => {
  const {
    loading,
    mapLocation,
    userLocation,
    userLocationStatus,
    showCenterMap,
    handleCenterMap,
    handleRegionChange,
  } = useHome();

  return (
    <Container>
      {loading && <PageLoader />}

      {!loading && (
        <>
          <Map
            region={mapLocation}
            showsMyLocationButton={false}
            showsPointsOfInterest={false}
            showsCompass={false}
            showsScale={false}
            showsBuildings={false}
            toolbarEnabled={false}
            zoomControlEnabled={false}
            moveOnMarkerPress={false}
            onRegionChangeComplete={handleRegionChange}
          >
            {userLocationStatus === 'granted' && userLocation && (
              <>
                <UserMarker coordinate={userLocation} />
              </>
            )}
          </Map>
        </>
      )}

      {showCenterMap && <CenterMap handleCenterMap={handleCenterMap} />}
    </Container>
  );
}

export default Home;