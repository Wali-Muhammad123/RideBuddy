import * as React from 'react';
import api from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {TextInput, SegmentedButtons, Text, Button} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import { useDispatch } from 'react-redux';
import { userSignup } from '../redux/thunks/userSliceThunks';

const UserSignupScreen = (({navigation}) =>{
    const dispatch = useDispatch();
    const [firstName,setFirstName] = React.useState("");
    const [lastName,setLastName] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [role, setRole] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const submitHandler = async () =>{
        setLoading(true);
        if (firstName.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0 || role.length === 0) {
            alert("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        dispatch(userSignup({email,password,confirmPassword,firstName,lastName,role})).then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                console.log(">>>>>>Response data", action.payload);
                if (action.payload.user.role === "customer"){
                    navigation.navigate("CustomerHome");
                } else {
                    navigation.navigate("AvailableRides");
                }
            }
        }
        ).catch((error)=>{
            alert(error.response.data.detail);
        }
        ).finally(()=>{
            setLoading(false);
        })
    }

    return (
        <View style={styles.container}>
            <Text 
            variant="displaySmall"
            style={{marginBottom: 30, marginTop: 20, textAlign: 'center'}}
            >Sign Up on Ride Buddy</Text>
            <TextInput
            style={{marginBottom: 10, width: 250}}
            label="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            />
            <TextInput
            style={{marginBottom: 10, width: 250}}
            label="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
            />
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
            <TextInput 
            secureTextEntry={true}
            style={{marginBottom: 10, width: 250}}
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            />
            <Text style={{marginBottom:10, marginTop:20}}> You want to continue as ...  </Text>
            <SegmentedButtons
            style={{marginBottom: 10, width: 200}}
            label="Role"
            value={role}
            onValueChange={value => setRole(value)}
            buttons={[
                { label: 'Rider', value: 'rider' },
                { label: 'Customer', value: 'customer' },
            
            ]}
            />
            <Button 
            mode="contained"
            style={{marginBottom: 10, width: 250, marginTop:20}}
            loading={loading}
            onPress={submitHandler}
            >Sign Up</Button>
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

export default UserSignupScreen;