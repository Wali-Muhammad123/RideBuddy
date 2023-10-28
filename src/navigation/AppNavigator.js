import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {View, StatusBar, StyleSheet} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import AppStack from './MainApp';
import AuthStack from './AuthStack';


const AuthLoadingScreen = (() => {
    return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    )
}
)

const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default createAppContainer(AppNavigator);