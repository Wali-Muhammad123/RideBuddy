import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectAccessToken } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
const AuthLoadingScreen = (({navigation}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const accessToken = null;
    const checkLoggedIn = (accessToken) => {
            try {
                console.log(accessToken);
                if (accessToken != null) {
                    navigation.navigate('Home');
                } else {
                    navigation.navigate('Login');
                }
            
            } catch (error) {
                console.log(error);
            }
    }
    React.useEffect(() => {
        checkLoggedIn(accessToken);
    }, []);
    return (
        <SafeAreaView>
        <View>
            <Button onPress={() => navigation.navigate('Login')} title="Login" />
        </View>
        </SafeAreaView>
    )
}
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AuthLoadingScreen;