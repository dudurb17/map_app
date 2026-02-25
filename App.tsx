import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

function App() {
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setLoading(false);
            return;
          }
        }

        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;

            setRegion({
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
            setLoading(false);
          },
          geoError => {
            console.log(geoError);
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    requestLocationPermission();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1a1a2e" />
        <Text style={styles.loadingText}>Obtendo sua localização...</Text>
      </View>
    );
  }

  if (!region) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Não foi possível carregar o mapa.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsTraffic={true}
        showsUserLocation={true}
        initialRegion={region}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#1a1a2e',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    color: '#c00',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 14,
  },
  cityList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cityButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f5',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  cityButtonActive: {
    backgroundColor: '#1a1a2e',
    borderColor: '#1a1a2e',
  },
  cityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  cityTextActive: {
    color: '#fff',
  },
  markerWrap: {
    alignItems: 'center',
  },
  markerBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerImage: {
    width: 28,
    height: 28,
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    marginTop: -2,
  },
  markerLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a2e',
    maxWidth: 80,
  },
});

export default App;
