import * as React from 'react';
import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View , FlatList} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OfferCard from '../components/offerCard';
import {useDispatch, useSelector} from 'react-redux';
import { selectAccessToken } from '../redux/slices/userSlice';
import axios from 'axios';
import api from '../utils/constants';




const GetOffersScreen = (({navigation}) => {
    const [offers, setOffers] = React.useState([]);
    const [accept, setAccept] = React.useState(null);
    const accessToken = useSelector(selectAccessToken);
    const onAccept = (id) => {
        setAccept(id);
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(api + 'ride/available_riders/', {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            setOffers(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error appropriately
        }
    };
    const reload = () => {
        fetchData();
    }
    React.useEffect(() => {
        fetchData();
    }, []);
    React.useEffect(()=>{
        if(accept){
            navigation.navigate('InRideCustomer');
        }
    },[accept])
    return (
        <SafeAreaProvider>
            <Appbar.Header>
                <Appbar.Content title="Available Riders" />
                <Appbar.Action icon="refresh" onPress={() => reload()} />
                <Appbar.BackAction onPress={() => console.log('Pressed')} />
            </Appbar.Header>
            {console.log(">>>>>>offers",offers)}
            <FlatList
                data={offers}
                renderItem={({item}) => <OfferCard offer={item} handleAccept={onAccept}/>}
                keyExtractor={({item}) => item?.id}
            />
        </SafeAreaProvider>
    )
})

export default GetOffersScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})