import React from "react";
import {
  StyleSheet,
  Image,
  View,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import {
  Text,
  Container,
  Footer,
  FooterTab,
  Button,
  Content,
  Body,
  Item
} from "native-base";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons
} from "@expo/vector-icons";
import Expo from "expo";
import api from "../services/api";

export default class Profile extends React.Component {
  static navigationOptions = {
    title: "Perfil",
    headerStyle: {
      backgroundColor: "#ef5350"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "200"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      email: "",
      photoUrl: "",
      isLoading: false
    };
  }

  async componentDidMount() {
    this.isSignedIn();
  }

  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "101030558285-86469si794dpkdgopvr3huloj1h8mvnr.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      });

      if (result.type == "success") this.handleGoogleResponse(result);
      else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  showLoading = () => {
    this.setState({ isLoading: true });
  };

  isSignedIn = async () => {
    const token = await AsyncStorage.getItem("@iCook:token");
    const all = await AsyncStorage.getAllKeys();
    token ? this.setState({ signedIn: true }) : "";
    console.log(all);
  };

  // entrar / cadastrar
  handleGoogleResponse = async result => {
    try {
      const response = await api.post("/auth/register", {
        name: result.user.name,
        email: result.user.email,
        img: result.user.photoUrl
      });
      await AsyncStorage.setItem("@iCook:name", result.user.name);
      await AsyncStorage.setItem("@iCook:userImage", result.user.photoUrl);
      await AsyncStorage.setItem("@iCook:token", response.data.token);

      this.setState({
        signedIn: true
      });
    } catch (error) {
      console.warn(error);
    }
  };

  render() {
    return (
      <Container
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Item style={styles.items}>
          <Text style={styles.msgTitle}>Crie sua iCook Conta!</Text>
        </Item>
        <Item style={styles.items}>
          <FontAwesome name="heart" style={styles.msgIcons} size={24} />
          <Text style={styles.msgText}>Adicione receitas aos favoritos</Text>
        </Item>
        <Item style={styles.items}>
          <MaterialIcons
            name="restaurant-menu"
            style={styles.msgIcons}
            size={24}
          />
          <Text style={styles.msgText}>Crie suas próprias receitas</Text>
        </Item>
        <Item style={{ justifyContent: "center", borderBottomWidth: 0 }}>
          <Button style={styles.googleButton} onPress={() => this.signIn}>
            <Image
              style={styles.googleImage}
              source={require("../../assets/icons/google.png")}
            />
            <Text style={styles.googleButtonText}>Entrar com Google</Text>
          </Button>
        </Item>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  hearts: {
    alignSelf: "flex-end",
    left: 15
  },
  items: {
    marginBottom: 18,
    borderBottomWidth: 0
  },
  msgTitle: {
    marginBottom: 10,
    fontWeight: "bold",
    color: "#4C4E52",
    fontSize: 20
  },
  msgText: {
    color: "#818385"
  },
  msgIcons: {
    color: "#4C4E52",
    marginRight: 8
  },
  googleButton: {
    backgroundColor: "#3278EB"
    // width: '100%',
  },
  googleImage: {
    width: 25,
    height: 25,
    margin: 5
  },
  googleButtonText: {
    fontWeight: "300",
    color: "#fff"
  }
});
