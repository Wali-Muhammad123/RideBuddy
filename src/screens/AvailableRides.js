import * as React from 'react';
import {View, StyleSheet,PermissionsAndroid, Platform, Alert}  from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar, Text, Button } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/slices/userSlice';
import axios from 'axios';
import api from '../utils/constants';
import RideCard from '../components/rideCard';

const AvailableRides = ({navigation}) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [hasLocationPermission, setHasLocationPermission] = React.useState(false);
    const [availableRides, setAvailableRides] = React.useState([]);
    const [accept, setAccept] = React.useState(null);
    const onAccept = (id) => {
        setAccept(id);
    }
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
              Alert.alert("Location permission denied. You need to enable location Permission in order to use this app.")
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
      const updateRiderLocation = async () => {
        try {
            if (currentLocation === null) {
                return;
            }
        const response = await axios.post(
            api+'users/update/availability/rider',
            currentLocation, {
                "headers":{
                    "Authorization": "Bearer "+accessToken,
                    "Content-Type": "application/json"
                }
            }
        );
        if (response.status === 200) {
            console.log("Successfully updated rider location");
        }
            } catch (error) {
            console.log(error);
        }
      };
      const getAvailableRides = async () => {
        try {
            const response = await axios.get(
                api+'ride/find_customers/',
                {
                    "headers":{
                        "Authorization": "Bearer "+accessToken,
                    }
                }
            )

            if (response.status === 200) {
                setAvailableRides(response.data);
                console.log("Available rides", response.data)
            }
        } catch(error) {
            console.log(error);
        }
      }
      React.useEffect(() => {
        requestLocationPermission();
        updateRiderLocation();
        getAvailableRides();
      },[hasLocationPermission])
      React.useEffect(()=>{
        if(accept){
            navigation.navigate('InRideCustomer');
        }},[accept])
    return (
        <SafeAreaProvider>
            <Appbar.Header>
                <Appbar.Content title="Available Rides" />
                <Appbar.Action icon="refresh" onPress={() => console.log('Pressed')} />
                <Appbar.BackAction onPress={() => console.log('Pressed')} />
            </Appbar.Header>
                <View>
                    <FlatList
                        data={availableRides}
                        renderItem={({item}) => <RideCard ride={item} handleAccept={onAccept}/>}
                        keyExtractor={({item}) => item?.id}
                    />
                    <Button onPress={() => navigation.navigate('ConfirmAvailable')}>Confirm</Button>
                </View>
        </SafeAreaProvider>
    );
}

export default AvailableRides;