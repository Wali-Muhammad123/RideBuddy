import * as React from 'react';
import axios from 'axios';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/constants';

const UserLoginScreen =(({navigation})=> {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const submitHandler = async () => {
        if (email.length === 0 || password.length === 0) {
            alert("Please fill in all fields");
            return;
        }
        await axios.post(api+'accounts/login/', {
            email,
            password,
        }).then((response) => {
            const {access, refresh} = response.data;
            AsyncStorage.setItem('userToken', access);
            AsyncStorage.setItem('refreshToken', refresh);
            navigation.navigate('')

        }).catch((error) => {
            alert("Invalid credentials");
        }
        )
        
    }
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
            onPress={submitHandler}
            >
                Login
            </Button>
            <Text style={{marginBottom:10, marginTop:20}}> Don't have an account? </Text>
            <Button
            mode="contained"
            style={{marginBottom: 10, width: 200, marginTop:20}}
            loading={false}
            onPress={() => navigation.navigate('Signup')}
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