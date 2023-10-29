/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import UserLoginScreen from './src/screens/userLoginScreen';
import StarRating from './src/components/starRating';
import RatingScreen from './src/screens/ratingScreen';
import GetOffersScreen from './src/screens/getOffers';
import OfferCard from './src/components/offerCard';
import InRideScreen from './src/screens/inRideScreen';
import Timer from './src/components/timer';
import WaitingScreen from './src/screens/waitingScreen';
import AppNavigator from './src/navigation/AppNavigator';



function App(): JSX.Element {

  return (
      //<RatingScreen/>
      <GetOffersScreen/>
      // <OfferCard
      // riderName={'Rider Name'}
      // riderRating={"4.5"}
      // riderOffer={'Rider Offer'}
      // riderDistance={3}
      // riderVehicle={'Rider Vehicle'}
      // arrivalTime={3}
      // id={'1'}
      // />
      //<InRideScreen pickupLocation={'Pickup Location'} dropOffLocation={'Dropoff Location'} />
      // <WaitingScreen />
      //<AppNavigator />

  );
}


export default App;
