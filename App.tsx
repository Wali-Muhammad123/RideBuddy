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
import ConfirmAvailable from './src/screens/ConfirmAvailable';
import { NavigationProvider } from 'react-navigation';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';


function App(): JSX.Element {

  return (
       // <AppNavigator/>
       <Provider store={store}>
          <AppNavigator/>
       </Provider>
  );
}


export default App;
