import * as React from "react";
import { View, StyleSheet } from "react-native";
import {Card, Button, Avatar, Text} from 'react-native-paper';
import api from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectUserId } from "../redux/slices/userSlice";
import { startRide } from "../redux/slices/rideSlice";

const OfferCard = ({offer, handleAccept}) => {
    const accessToken = useSelector(selectAccessToken);
    const customerId = useSelector(selectUserId);
    const dispatch = useDispatch();
    const acceptRequest = async (id, ride_id) => {
        dispatch(startRide({
            "rider": offer.rider.id,
            "customer": customerId,
            "travelPrice": offer.deal_price,
            "travelTime": offer.demographics.arrival_time,
            "ride_id":offer.ride_id
        }));
        await axios.post(`${api}ride/available_riders/${id}/book_ride/`,{},{
            "headers":{
                "Authorization": `Bearer ${accessToken}`
            }
        }).then((response) => {
            console.log("response",response);
            handleAccept(id);
        }).catch((error) => {
            console.log("error",error);
        })
    };
    const declineRequest = async (id) => {
        await axios.delete(`${api}ride/available_riders/${id}/`,{
            "headers":{
                "Authorization": `Bearer ${accessToken}`
            }
        }).then((response) => {
            console.log("response",response);
        }).catch((error) => {
            console.log("error",error);
        })
    };
    return (
        <Card style={{marginBottom: 10, width: 400}}>
                <Card.Title 
                title={offer.rider.vehicle} 
                subtitle={`${offer.rider?.rating}`}
                left={(props) => <Avatar.Icon {...props} icon="android-studio" />}
                right={(props) => <Text variant="bodyLarge" style={{marginRight:10}}>{`${offer?.deal_price}`}</Text>}
                />
                <View style={{marginLeft:70}}>
                        <Text>{offer?.rider?.full_name}</Text>
                        <Text>{`${offer?.demographics?.arrival_time}`}</Text>
                        <Text>{`${offer?.demographics?.distance}`}</Text>
                </View>
            <Card.Actions>
                <Button onPress={() => {acceptRequest(offer?.id,offer?.ride_id)}}>Accept</Button>
                <Button onPress={() => {declineRequest(offer?.id)}}>Decline</Button>
            </Card.Actions>
        </Card>
    )
}

export default OfferCard;