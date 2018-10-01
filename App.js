import React from "react";
// import Home from "./src/pages/Home";
// import Search from "./src/pages/Search";
// import ReceitaWebView from './src/pages/ReceitaWebView';
// import Profile from './src/pages/Profile';

// import { createStackNavigator } from "react-navigation";
import { Font, AppLoading } from "expo";
import { isSignedIn } from "./src/services/auth";
import {
  createRootNavigator,
  // SignedOutRoutes,
  // SignedInRoutes
} from "./src/routes";

// const RootStack = createStackNavigator({
//   Home,
//   Search,
//   ReceitaWebView,
//   Profile
// });

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      signed: false,
      signLoaded: false
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });

    isSignedIn()
    .then(res => this.setState({ signed: res, signLoaded: true, isLoading: false }))
    .catch(err => alert("Erro"));
  }

  render() {
    const {signLoaded, signed} = this.state;

    if (!signLoaded) {
      return null;
    }
    

    const Layout = createRootNavigator(signed);
    return <Layout />;
    // if (this.state.isLoading) {
    //   // return <AppLoading />;
    // }
  }
}
