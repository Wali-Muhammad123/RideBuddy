import * as React from 'react';
import {View, StyleSheet, ScrollView}  from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar, Text, Button } from 'react-native-paper';

const AvailableRides = ({navigation}) => {
    return (
        <SafeAreaProvider>
            <Appbar.Header>
                <Appbar.Content title="Available Riders" />
                <Appbar.Action icon="refresh" onPress={() => console.log('Pressed')} />
                <Appbar.BackAction onPress={() => console.log('Pressed')} />
            </Appbar.Header>
            <ScrollView>
                <View style={styles.container}>
                    <Text>Available Rides</Text>
                    <Button onPress={() => navigation.navigate('ConfirmAvailable')}>Confirm</Button>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}

export default AvailableRides;