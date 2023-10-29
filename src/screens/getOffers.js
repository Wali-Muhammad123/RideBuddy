import * as React from 'react';
import { Appbar, Text } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OfferCard from '../components/offerCard';


const GetOffersScreen = (() => {
    const [offers, setOffers] = React.useState([])
    React.useEffect(() => {
        console.log("GetOffersScreen")

    }, [offers])
    return (
        <SafeAreaProvider>
            <Appbar.Header>
                <Appbar.Content title="Available Riders" />
                <Appbar.Action icon="refresh" onPress={() => console.log('Pressed')} />
                <Appbar.BackAction onPress={() => console.log('Pressed')} />
            </Appbar.Header>
            <ScrollView>
                {offers.map((offer) => (
                    <OfferCard
                        riderName={offer.riderName ? offer.riderName : null}
                        riderRating={offer.riderRating ? offer.riderRating : null}
                        riderOffer={offer.riderOffer ? offer.riderOffer : null}
                        riderDistance={offer.riderDistance ? offer.riderDistance : null}
                        riderVehicle={offer.riderVehicle ? offer.riderVehicle : null}
                        arrivalTime={offer.arrivalTime ? offer.arrivalTime : null}
                        id={offer.id ? offer.id : null}
                    />
                ))}
            </ScrollView>
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