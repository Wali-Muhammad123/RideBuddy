import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Dimensions, View, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { selectOrigin, selectDestination } from '../redux/slices/rideSlice';



const GOOGLE_PLACES_API_KEY='AIzaSyBESvyXo9K4htBrAH50Rj9ogTpUZpxUz8w';

const InRideCustomerScreen = ({navigation}) => {
    const [route, setRoute] = useState(null);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const startLocation = { latitude: origin?.lat, longitude: origin?.lon };
    const endLocation = { latitude: destination?.lat, longitude: destination?.lon };

    return (
        <View style={styles.container}>
        <MapView
            style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
            initialRegion={{
                latitude: startLocation.latitude,
                longitude: startLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Marker coordinate={startLocation} />
            <Marker coordinate={endLocation} />
        </MapView>
        <View style={styles.buttonContainer}>
                <Button 
                onPress={() => navigation.navigate('Rating')}
                title="End Ride"
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
    },
    overlay: {
        position: 'absolute', // This positions your text box absolutely within the parent container
        top: 10, // Adjust this value to position the box from the top
        left: 10, // Adjust this value to position the box from the left
        right: 10, // Adjust this value to position the box from the right
        zIndex: 1, // Ensures the overlay is above the map
      },
      buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
      },

})

export default InRideCustomerScreen;
