import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const CITIES = [
  { name: 'Rio de Janeiro', latitude: -22.90684, longitude: -43.17289 },
  { name: 'São Paulo', latitude: -23.55052, longitude: -46.63331 },
  { name: 'Brasília', latitude: -15.7801, longitude: -47.9292 },
  { name: 'Salvador', latitude: -12.9714, longitude: -38.5124 },
];

function App() {
  const [selected, setSelected] = useState(0);
  const [markers, setMarkers] = useState([
    {
      coordinate: {
        latitude: -22.90684,
        longitude: -43.17289,
      },
      image: require('./src/assets/images/carro.png'),
      title: 'Rio de Janeiro',
      description: 'test description',
      pinColor: 'green',
    },
    {
      coordinate: {
        latitude: -23.55052,
        longitude: -46.63331,
      },
      image: require('./src/assets/images/carro_right.png'),
      title: 'São Paulo',
      description: 'test description',
      pinColor: 'blue',
    },
    {
      image: require('./src/assets/images/carro_left.png'),
      coordinate: {
        latitude: -15.7801,
        longitude: -47.9292,
      },
      title: 'Brasília',
      description: 'test description',
      pinColor: 'red',
    },
    {
      image: require('./src/assets/images/carro_down.png'),
      coordinate: {
        latitude: -12.9714,
        longitude: -38.5124,
      },
      title: 'Salvador',
      description: 'test description',
      pinColor: 'yellow',
    },
  ]);

  const region: Region = {
    latitude: CITIES[selected].latitude,
    longitude: CITIES[selected].longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsTraffic={true}
        // onPress={event =>
        //   setMarkers([
        //     ...markers,
        //     {
        //       coordinate: event.nativeEvent.coordinate,
        //       title: 'New Marker',
        //       description: 'test description',
        //       pinColor: 'green',
        //     },
        //   ])
        // }
        // zoomEnabled={false}
        // rotateEnabled={false}
        // scrollEnabled={false}
        // mapType="hybrid"  // satellite, terrain, hybrid
        // onRegionChangeComplete={() => Alert.alert('Region changed')}
        // onMapReady={() => Alert.alert('Map ready')}
        // onTouchStart={() => Alert.alert('Map touched')}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            image={marker.image}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}
          />
        ))}
      </MapView>

      <SafeAreaView style={styles.overlay} edges={['bottom']}>
        <Text style={styles.title}>Explorar cidades</Text>
        <View style={styles.cityList}>
          {CITIES.map((city, index) => (
            <TouchableOpacity
              key={city.name}
              style={[
                styles.cityButton,
                selected === index && styles.cityButtonActive,
              ]}
              onPress={() => setSelected(index)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.cityText,
                  selected === index && styles.cityTextActive,
                ]}
              >
                {city.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
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
});

export default App;
