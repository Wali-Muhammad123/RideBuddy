import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoadingScreen = (({navigation}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const checkLoggedIn = async () => {
            try {
                const value = await AsyncStorage.getItem('userToken');
                if (value !== null) {
                    navigation.navigate('Login');
                } else {
                    navigation.navigate('Login');
                }
            
            } catch (error) {
                console.log(error);
            }
    }
    React.useEffect(() => {
        checkLoggedIn();
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