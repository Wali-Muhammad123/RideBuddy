import * as React from 'react';
import {TextInput, SegmentedButtons, Text, Button} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const UserSignupScreen = (() =>{

    const [name,setName] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [role, setRole] = React.useState("");

    return (
        <View style={styles.container}>
            <Text 
            variant="displaySmall"
            style={{marginBottom: 30, marginTop: 20, textAlign: 'center'}}
            >Sign Up on Ride Buddy</Text>
            <TextInput
            style={{marginBottom: 10}}
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
            />
            <TextInput
            style={{marginBottom: 10}}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            />
            <TextInput
            secureTextEntry={true}
            style={{marginBottom: 10}}
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            />
            <TextInput 
            secureTextEntry={true}
            style={{marginBottom: 10}}
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
                { label: 'Driver', value: 'driver' },
            
            ]}
            />
            <Button 
            mode="contained"
            style={{marginBottom: 10, width: 200, marginTop:20}}
            loading={false}
            onPress={() => console.log('Pressed')}
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