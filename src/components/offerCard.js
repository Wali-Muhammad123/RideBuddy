import * as React from "react";
import { View, StyleSheet } from "react-native";
import {Card, Button, Avatar, Text} from 'react-native-paper';


const OfferCard = ({riderName, riderOffer, riderVehicle, riderRating, riderDistance, arrivalTime, id}) => {
    return (
        <Card style={{marginBottom: 10, width: 400}}>
                <Card.Title 
                title={riderVehicle} 
                subtitle={riderRating}
                left={(props) => <Avatar.Icon {...props} icon="android-studio" />}
                right={(props) => <Text variant="bodyLarge" style={{marginRight:10}}>{riderOffer}</Text>}
                />
                <View style={{marginLeft:70}}>
                        <Text>{riderName}</Text>
                        <Text>{arrivalTime}</Text>
                        <Text>{riderDistance}</Text>
                </View>
            <Card.Actions>
                <Button>Accept</Button>
                <Button>Decline</Button>
            </Card.Actions>
        </Card>
    )
}

export default OfferCard;