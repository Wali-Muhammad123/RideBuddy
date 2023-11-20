import * as React from 'react';
import {Text, Button, Icon, MD3Colors} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import axios from 'axios';
import api from '../utils/constants';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/slices/userSlice';
import { selectRider } from '../redux/slices/rideSlice';



const PaymentScreen = ({navigation}) => {
    const [bank, setBank] = React.useState('');
    const accessToken = useSelector(selectAccessToken);
    const rider = useSelector(selectRider);
    React.useEffect(() => {
        const fetchData = async () => { // Add async here
          try {
            const response = await axios.get(`${api}users/rider/bank_details?rider_id=${rider}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            setBank(response.data?.bank_account);
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchData();
      }, []);

    return (
        <View style={styles.container}>
            <Icon name="credit-card" size={100} color={MD3Colors.pinkA200} />
            <Text variant="bodyLarge">Bank Details of Rider</Text>
            <Text variant="bodyMedium">{bank}</Text>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Rating')}
                style={styles.button}
            />
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontSize: 30,
        marginBottom: 10,
      },
      button: {
        marginTop: 10,
      },
})

export default PaymentScreen;