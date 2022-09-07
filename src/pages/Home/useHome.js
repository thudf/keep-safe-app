import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

const useHome = () => {
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
    const isLatEqual = userLocation.latitude.toFixed(5) === mapLocation.latitude.toFixed(5);
    const isLongEqual = userLocation.longitude.toFixed(5) === mapLocation.longitude.toFixed(5);

    if (!isLatEqual || !isLongEqual) {
      setShowCenterMap(true);
    }

    if (isLatEqual && isLongEqual) {
      setShowCenterMap(false);
    }
  }, [userLocation, mapLocation]);

  useEffect(() => {
    getUserLocationPermission();
  }, []);

  return {
    loading,
    mapLocation,
    userLocation,
    userLocationStatus,
    showCenterMap,
    handleCenterMap,
    handleRegionChange,
  }

};

export default useHome;