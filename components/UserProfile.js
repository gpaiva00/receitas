import React from "react";
import { Container, Text, Footer, FooterTab, Button } from "native-base";
import { AsyncStorage, StyleSheet, View, Image } from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome
} from "@expo/vector-icons";

export default class UserProfile extends React.Component {
  state = {
    username: "",
    userImage: ""
  };

  async componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    try {
      const username = await AsyncStorage.getItem("@iCook:name");
      const userImage = await AsyncStorage.getItem("@iCook:userImage");

      this.setState({ username, userImage });
    } catch (error) {
      console.warn(error);
    }
  };

  render() {
    return (
      <Container>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image style={styles.image} source={{ uri: this.state.userImage }} />
          <Text style={styles.userName}>{this.state.username}</Text>
        </View>

        <Footer style={{ height: 50 }}>
          <FooterTab style={styles.footer}>
            <Button
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            >
              <MaterialCommunityIcons
                name="home-outline"
                size={24}
                style={styles.footerIcons}
              />
              <Text style={styles.footerText}>Início</Text>
            </Button>
            <Button
              onPress={() => {
                props.navigation.navigate("Search");
              }}
            >
              <Feather name="search" size={24} style={styles.footerIcons} />
              <Text style={styles.footerText}>Buscar</Text>
            </Button>
            <Button onPress={() => {}}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={24}
                style={styles.footerIcons}
              />
              <Text style={styles.footerText}>Favoritos</Text>
            </Button>
            <Button>
              <FontAwesome name="user-o" size={24} style={styles.textActive} />
              <Text style={styles.textActive}>Perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#FFF"
  },
  footerIcons: {
    color: "#4C4E52"
  },
  footerText: {
    color: "#999",
    fontSize: 7
  },
  textActive: {
    color: "#ef5350"
  },
  userName: {
    fontWeight: "bold",
    color: "#4C4E52",
    fontSize: 20
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});
