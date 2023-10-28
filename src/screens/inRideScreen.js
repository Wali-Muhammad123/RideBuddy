import * as React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import {Button, Avatar} from 'react-native-paper';



const InRideScreen = ({pickupLocation, dropOffLocation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Avatar.Icon icon="car" size={100} />
                <Text variant="header" style={{marginTop:15}}>In Ride</Text>
            </View>
            <View style={styles.body}>
                <Text variant="bodyLarge">Pickup Location: {pickupLocation}</Text>
                <Text variant="bodyLarge">Drop Off Location: {dropOffLocation}</Text>
            </View>
            <View style={styles.footer}>
                <Button mode="contained">End Ride</Button>
            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default InRideScreen;