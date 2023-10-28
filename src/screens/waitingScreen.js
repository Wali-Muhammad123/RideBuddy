import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Avatar, Text} from 'react-native-paper';
import Timer from '../components/timer';


const WaitingScreen = () => {
    const [phone, setPhone] = React.useState('');
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avatar.Icon icon="car" size={100} />
                <Text variant="displaySmall" style={{marginTop:15}}>Waiting for Rider</Text>
                <Timer onTimerEnd={() => console.log('Timer ended')} />
                <Text variant="bodyLarge" style={{marginTop:15}}>Call the Rider {phone} </Text>
            </View>
            <View style={styles.body}>
                <Button mode="contained" style={{width:150}}>Start Ride </Button>
                <Button mode="contained" style={{marginTop:15, width:150}}>Cancel Ride </Button>
            </View>
        </View>

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
    }
})

export default WaitingScreen;