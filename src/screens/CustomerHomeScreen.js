import * as React from 'react';
import { View, StyleSheet , PermissionsAndroid, Platform, Button } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setOrigin } from '../redux/slices/rideSlice';
import axios from 'axios';
import api from '../utils/constants';
import { selectAccessToken } from '../redux/slices/userSlice';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBESvyXo9K4htBrAH50Rj9ogTpUZpxUz8w';

const HomeScreen = (({navigation}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const [hasLocationPermission, setHasLocationPermission] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [isPlaceSelected, setIsPlaceSelected] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState(null);

const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    // TODO: Add iOS permission request logic here
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This app needs to access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true);
         Geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              "lat": position.coords.latitude,
              "lon": position.coords.longitude
            });
          },
          (error) => {
            console.warn(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        setHasLocationPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

React.useEffect(() => {
  requestLocationPermission();
}, [hasLocationPermission]);

return (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      showsUserLocation={hasLocationPermission}
    >
    </MapView>
    <View style={styles.overlay}>
        <GooglePlacesAutocomplete
        placeholder='Select Destination Location'
        placeholderTextColor="black"
        onPress={(data, details = null) => {
          if (details) {
            setIsPlaceSelected(true);
            const latitude = details.geometry.location.lat;
            const longitude = details.geometry.location.lng;
            setSelectedLocation({
              "lat": latitude,
              "lon": longitude
             });
          }
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
          components:"country:pk"
        }}
        debounce={200}
        enablePoweredByContainer={false}
        fetchDetails={true}
        autoFillOnNotFound={true}
        />
      </View>
      {isPlaceSelected && (
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm Location"
            onPress={async () =>{
              try {
                dispatch(setDestination(selectedLocation));
                dispatch(setOrigin(currentLocation));
                console.log(">>>>>Current Location", currentLocation)
                await axios.post(api+'users/update/availability/customer', {
                  "pickup":currentLocation,
                  "drop_off":selectedLocation
                }, {
                  "headers":{
                    "Authorization": "Bearer "+ accessToken,
                  }
                }).then((response) => {
                  if (response.status === 200) {
                    console.log(">>>>>Availability Updated")
                  } else {
                    console.log(">>>>>Availability Not Updated")
                    console.log(">>>>>Response", response)
                  }
                }).catch((error) => {
                  console.log(">>>>>Availability Not Updated")
                  console.log(">>>>>Error", error)
                })
                navigation.navigate('GetOffers')
              } catch (error) {
                console.log(">>>>Error", error)
              }
            }}
          />
        </View>
      )}
  </View>
);
});
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: 'absolute', // This positions your text box absolutely within the parent container
    top: 10, // Adjust this value to position the box from the top
    left: 10, // Adjust this value to position the box from the left
    right: 10, // Adjust this value to position the box from the right
    zIndex: 1, // Ensures the overlay is above the map
  },
  textBox: {
    height: 40,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 5, // Elevation for Android
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
export default HomeScreen;
