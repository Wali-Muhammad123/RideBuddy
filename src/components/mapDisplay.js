import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


class MapLocationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null,
        };
    }
    componentDidMount() {
        this.fetchUserLocation();
    }
    fetchUserLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.setState({ userLocation: { latitude, longitude } });
            },
            (error) => {
                console.log('Error getting user location:', error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
    render() {
        const { userLocation } = this.state;
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: userLocation ? userLocation.latitude : 37.78825,
                        longitude: userLocation ? userLocation.longitude : -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {userLocation && (
                        <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }} />
                    )}
                </MapView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    searchContainer: {
      position: 'absolute',
      top: 20,
      left: 10,
      right: 10,
      flexDirection: 'column',
    },
  });

export default MapLocationView;