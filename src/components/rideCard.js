import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Avatar, Text, Portal, Modal, PaperProvider, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { selectAccessToken, selectUserId } from "../redux/slices/userSlice";
import { setOrigin, setCustomer, setDestination,setRider } from "../redux/slices/rideSlice";
import api from "../utils/constants";
import axios from "axios";

const RideCard = ({ ride, handleAccept }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);
    const riderId = useSelector(selectUserId);
    const [riderOffer, setRiderOffer] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [offerMade, setOfferMade] = React.useState(false);
    const [offerId, setOfferId] = React.useState(null);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const pointFormatter = (pointArray) => {
        return {
            "lat": pointArray[0],
            "lon": pointArray[1]
        }
    }
    const submitOffer = async () => {
        try {
            const response = await axios.patch(`${api}ride/find_customers/${offerId}/`, {
                "deal_price": Number(riderOffer)
            },{
                "headers":{
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                setOfferMade(true);
                hideModal();
                handleAccept(offerId)
            }
        } catch (error) {
            console.log("error",error);
        }
    }
    React.useEffect(() => {
        const origin = pointFormatter(ride?.pickup_location?.coordinates);
        const destination = pointFormatter(ride?.drop_off_location?.coordinates);
        dispatch(setOrigin(origin));
        dispatch(setDestination(destination));
        dispatch(setCustomer(ride?.customer?.id));
        dispatch(setRider(riderId));
    })
    return (
        <PaperProvider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <View>
                        <Text variant="headlineMedium"> Make an Offer </Text>
                        <TextInput label="Enter your offer" value={riderOffer} onChangeText={text => setRiderOffer(text)} style={{marginTop:15}} />
                        <Button mode="contained" onPress={submitOffer} style={{marginTop:20}}>Submit</Button>
                    </View>
                </Modal>
            </Portal>
            <Card style={{ marginBottom: 10, width: 400 }}>
                <Card.Title
                    title={ride?.customer?.full_name}
                    subtitle={ride?.customer?.phone_number}
                    left={(props) => <Avatar.Icon {...props} icon="android-studio" />}
                    right={(props) => <Text variant="bodyLarge" style={{ marginRight: 10 }}>{riderOffer}</Text>}
                />
                <View style={{ marginLeft: 70 }}>
                    <Text>{ride?.demographics?.distance} km</Text>
                    <Text>{ride?.demographics?.time} min</Text>
                </View>
                <Card.Actions>
                    { offerMade ? (
                        <>
                        <Text variant="bodyLarge">Offer Made Already</Text>
                    </>) :(
                    <Button onPress={() => {
                        setOfferId(ride?.id);
                        showModal();
                    }}>Make an Offer</Button>
                    )
                }
                </Card.Actions>
            </Card>
        </PaperProvider>
    )
}

export default RideCard;