import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import StarRating from '../components/starRating';

const RatingScreen =(()=> {
    const [feedback, setFeedback] = React.useState("");
    return (
        <View style={styles.container}>
            <Text style={{marginBottom: 10, marginTop: 20, textAlign: 'center'}} variant="headlineMedium">Rate your ride</Text>
            <StarRating maxStars={5} rating={0} onStarPress={() => console.log('Pressed')} />
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
            onPress={() => console.log('Pressed')}
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