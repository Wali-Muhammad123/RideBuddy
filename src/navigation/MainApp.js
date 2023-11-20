import { createStackNavigator } from "react-navigation-stack";
import GetOffersScreen from "../screens/getOffers";
import RatingScreen from "../screens/ratingScreen";
import InRideScreen from "../screens/inRideScreen";
import WaitingScreen from "../screens/waitingScreen";
import HomeScreen from "../screens/CustomerHomeScreen";
import InRideCustomerScreen from "../screens/inRideCustomer";
import AvailableRides from "../screens/AvailableRides";
import PaymentScreen from "../screens/PaymentScreen";

const AppStack = createStackNavigator(
    {
        CustomerHome: HomeScreen,
        Waiting: WaitingScreen,
        InRide: InRideScreen,
        Rating: RatingScreen,
        GetOffers: GetOffersScreen,
        InRideCustomer: InRideCustomerScreen,
        AvailableRides: AvailableRides,
        PaymentScreen: PaymentScreen
    },
    {
        initialRouteName: "CustomerHome",
        headerMode: "none",
        navigationOptions: {
        headerVisible: false
        }
    }
    );

export default AppStack;