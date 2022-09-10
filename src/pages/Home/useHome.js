import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import { getDatabase, ref, onValue} from "firebase/database";

const useHome = () => {
  const db = getDatabase();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [mapLocation, setMapLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [userLocationStatus, setUserLocationStatus] = useState(null);
  const [showCenterMap, setShowCenterMap] = useState(false);
  const [reports, setReports] = useState([]);

  const handleRegionChange = (evt) => {
    setMapLocation({ ...evt })
  };

  const handleMapLocation = (userLat, userLong) => {
    const {
      latitude,
      latitudeDelta,
      longitude,
      longitudeDelta,
    } = mapLocation;

    if (latitude === 0 || latitudeDelta === 10 || 
      longitude === 0 || longitudeDelta === 10) {
        setMapLocation(oldStt => {
          const latDelta = oldStt.latitudeDelta === 10 
            ? 0.0922 
            : oldStt.latitudeDelta;
    
          const lat = oldStt.latitude === 0 
            ? userLat 
            : oldStt.latitude;
      
          const longDelta = oldStt.longitudeDelta === 10 
            ? 0.0421 
            : oldStt.longitudeDelta;
      
          const long = oldStt.longitude === 0 
            ? userLong
            : oldStt.longitude;
    
          return {
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
            latitude: lat,
            longitude: long,
          };
        })
    }
  };

  const handleCenterMap = () => {
    setMapLocation(oldStt => ({
      ...oldStt,
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    }));
  }

  const getUserLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setUserLocationStatus(status);
  };

  const getCurrentUserLocation = async () => {
    const { 
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync();

    setUserLocation({ latitude, longitude });
    handleMapLocation(latitude, longitude);

    if (loading) {
      setLoading(false);
    }
  };

  const handleWatchReports = () => {
    const reportsRef = ref(db, 'reports/');
    onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reportList = Object.keys(data).map(key => ({ ...data[key], report_id: key }));
        setReports(reportList);
      }
    });
  };

  useEffect(() => {
    if (userLocationStatus && userLocationStatus !== 'granted') {
      Alert.alert('Localização Negada', 'Para utilizar o aplicativo, permita a localização!');
    }

    if (userLocationStatus && userLocationStatus === 'granted') {
      getCurrentUserLocation();
      setInterval(getCurrentUserLocation, 60000);
    }
  }, [userLocationStatus])

  useEffect(() => {
    const diff = 0.00005;

    const isLatEqual = () => {
      const { latitude: userLat } = userLocation;
      const { latitude: mapLat } = mapLocation;

      const fixedUserLat = parseFloat(userLat.toFixed(5));
      const fixedMapLat = parseFloat(mapLat.toFixed(5));

      const max = fixedMapLat + diff;
      const min = fixedMapLat - diff;

      return fixedUserLat <= max && fixedUserLat >= min;
    }

    const isLongEqual = () => {
      const { longitude: userLong } = userLocation;
      const { longitude: mapLong } = mapLocation;

      const fixedUserLong = parseFloat(userLong.toFixed(5));
      const fixedMapLong = parseFloat(mapLong.toFixed(5));

      const max = fixedMapLong + diff;
      const min = fixedMapLong - diff;

      return fixedUserLong <= max && fixedUserLong >= min;
    }

    if (!isLatEqual() || !isLongEqual()) {
      setShowCenterMap(true);
    }

    if (isLatEqual() && isLongEqual()) {
      setShowCenterMap(false);
    }
  }, [userLocation, mapLocation]);

  useEffect(() => {
    if (isFocused) {
      handleCenterMap();
    }
  }, [isFocused]);

  useEffect(() => {
    getUserLocationPermission();
    handleWatchReports();
  }, []);

  return {
    loading,
    reports,
    mapLocation,
    userLocation,
    userLocationStatus,
    showCenterMap,
    handleCenterMap,
    handleRegionChange,
  }

};

export default useHome;