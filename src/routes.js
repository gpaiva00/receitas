import { createStackNavigator } from "react-navigation";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ReceitaWebView from './pages/ReceitaWebView';
import Profile from "./pages/Profile";
import Login from "./pages/Login";

export const SignedOutRoutes = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Entrar"
    }
  }
});

export const SignedInRoutes = createStackNavigator ({
    Home,
    Search,
    ReceitaWebView,
    Profile
});

export const createRootNavigator = (signedIn = false) => {
    return createStackNavigator({
        SignedIn: {screen: SignedInRoutes, navigationOptions: {header: null}},
        SignedOut: {screen: SignedOutRoutes, navigationOptions: {header: null}}

    });
    // initialRouteName: (signedIn) ? 'iCook')

}
