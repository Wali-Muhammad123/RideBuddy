import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';


const UserLoginScreen =(()=> {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
        <View style={styles.container}>
            <Text
            variant="headlineMedium"
            style={{marginBottom: 30, marginTop: 20, textAlign: 'center'}}
            >Login to Ride Buddy</Text>
            <TextInput
            style={{marginBottom: 10, width: 250}}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            />
            <TextInput
            secureTextEntry={true}
            style={{marginBottom: 10, width: 250}}
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            />
            <Button
            mode="contained"
            style={{marginBottom: 10, width: 200, marginTop:20}}
            loading={false}
            onPress={() => console.log('Pressed')}
            >
                Login
            </Button>
            <Text style={{marginBottom:10, marginTop:20}}> Don't have an account? </Text>
            <Button
            mode="contained"
            style={{marginBottom: 10, width: 200, marginTop:20}}
            loading={false}
            onPress={() => console.log('Pressed')}
            >
                Sign Up
            </Button>
            </View>
    )
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default UserLoginScreen;