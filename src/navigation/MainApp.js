import { createStackNavigator } from "react-navigation-stack";
import GetOffersScreen from "../screens/getOffers";
import RatingScreen from "../screens/ratingScreen";
import InRideScreen from "../screens/inRideScreen";
import WaitingScreen from "../screens/waitingScreen";
import HomeScreen from "../screens/homeScreen";

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        Waiting: WaitingScreen,
        InRide: InRideScreen,
        Rating: RatingScreen,
        GetOffers: GetOffersScreen
    },
    {
        initialRouteName: "Home",
        headerMode: "none",
        navigationOptions: {
        headerVisible: false
        }
    }
    );

export default AppStack;