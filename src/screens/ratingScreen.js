import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import StarRating from '../components/starRating';
import axios from 'axios';
import api from '../utils/constants';
import { selectRider, selectCustomer } from '../redux/slices/rideSlice';
import { selectAccessToken } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';


const RatingScreen =(({navigation})=> {
    const [feedback, setFeedback] = React.useState("");
    const [rating, setRating] = React.useState(0);
    const rider = useSelector(selectRider);
    const customer = useSelector(selectCustomer);
    const accessToken =  useSelector(selectAccessToken);
    const handleStarPress = (newRating) => {
      setRating(newRating); 
    };
    const handleSubmit = () => {
        navigation.navigate('CustomerHome');
        // Submit the feedback and rating to the backend
        // axios.post( api + 'users/rating',{
        //     "rider":rider,
        //     "customer":customer,
        //     "rating":rating,
        //     "review":feedback
        // }, {
        //     headers: {
        //         Authorization: 'Bearer ' + accessToken
        //     }
        // }).then((response) => {
        //     navigation.navigate('Home');
        // }).catch((error) => {
        //     console.log(">>>>>Error", error)
        //     alert(error.response.data.detail);
        //     navigation.navigate('Home');
        // })
    };
    return (
        <View style={styles.container}>
            <Text style={{marginBottom: 10, marginTop: 20, textAlign: 'center'}} 
            variant="headlineMedium">
                Rate your ride
            </Text>
            <StarRating maxStars={5} rating={rating} onStarPress={handleStarPress} />
            <TextInput 
            style={{marginBottom: 10, width: 300, marginTop: 20, height: 100}}
            label="Comments"
            value={''}
            onChangeText={(text) => setFeedback(text)}
            />
            <Button 
            mode="contained"
            style={{marginBottom: 10, width: 200, marginTop:20}}
            loading={false}
            onPress={handleSubmit}
            >
                Submit
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
export default RatingScreen;