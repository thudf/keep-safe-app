import PageLoader from '../../components/PageLoader';
import CenterMap from './components/CenterMap';
import UserMarker from './components/UserMarker';
import ReportMarker from './components/ReportMarker';

import useHome from './useHome';

import { Container, Map } from './styles';

const Home = () => {
  const {
    loading,
    reports,
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
            {reports.map(report => (
              <ReportMarker key={report.report_id} report={report}  />
            ))}

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