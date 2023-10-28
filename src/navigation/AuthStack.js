import {createStackNavigator} from 'react-navigation-stack';

import UserLoginScreen from '../screens/userLoginScreen';
import UserSignupScreen from '../screens/userSignupScreen';


const AuthStack = createStackNavigator({
    Login: UserLoginScreen,
    Signup: UserSignupScreen,
}, {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default AuthStack;