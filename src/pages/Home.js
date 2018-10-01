import React from "react";
import api from "../services/api";
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  View,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Footer,
  Button,
  FooterTab,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Item
} from "native-base";
import {
  FontAwesome,
  MaterialCommunityIcons,
  EvilIcons,
  Feather,
  MaterialIcons
} from "@expo/vector-icons";
import Modal from "react-native-modal";

export default class Home extends React.Component {
  static navigationOptions = {
    title: "iCook",
    headerStyle: {
      backgroundColor: "#ef5350"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "200"
    }
    // headerLeft: (
    //   <MaterialIcons name="restaurant-menu" style={{color: '#fff', marginLeft: 5, width: 20}} />
    // )
  };

  state = {
    dataSource: null,
    isLoading: true,
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async componentDidMount() {
    await this.search();
  }

  search = async () => {
    const response = await api.get("/search/massas/null");

    this.setState({ dataSource: response.data.items });
  };

  renderItems = ({ item }) => {
    return (
      <Card style={{ flex: 0 }}>
        <CardItem
          button
          onPress={() => {
            this.props.navigation.navigate("ReceitaWebView", { receita: item });
          }}
        >
          <Body style={{ flexDirection: "row" }}>
            <Content>
              <Text>{item.title}</Text>
              <Text note>{item.displayLink}</Text>
            </Content>
            <Button
              transparent
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <EvilIcons name="heart" size={23} style={styles.hearts} />
            </Button>
          </Body>
        </CardItem>
        <CardItem
          cardBody
          onPress={() => {
            this.props.navigation.navigate("ReceitaWebView", { receita: item });
          }}
        >
          <Image
            source={{ uri: item.pagemap.cse_image[0].src }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Text note numberOfLines={4}>
            {item.snippet}
          </Text>
        </CardItem>
      </Card>
    );
  };

  showResults = () => {
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={this.renderItems}
        keyExtractor={item => item.link}
      />
    );
  };

  showLoading = () => (
    <Container
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ActivityIndicator size={30} />
    </Container>
  );

  toggleModal = () => {
    return (
      <Modal isVisible={this.state.modalVisible}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff"
          }}
        >
          <Text style={styles.msgTitle}>Crie sua iCook conta!</Text>
          <View>
            <Item style={styles.items}>
              <MaterialCommunityIcons
                name="heart"
                style={styles.msgIcons}
                size={24}
              />
              <Text style={styles.msgText}>
                Adicione receitas aos favoritos
              </Text>
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
              <Button transparent style={styles.googleButton}>
                <Image
                  source={require("../../assets/icons/google.png")}
                  style={styles.googleImage}
                />
                <Text style={styles.googleButtonText}>Entrar com google</Text>
              </Button>
            </Item>
            <Item
              style={{
                marginTop: 25,
                borderBottomWidth: 0,
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(false);
                }}
              >
                <Text
                  style={{ fontSize: 18, color: "#ef5350", fontWeight: "bold" }}
                >
                  Fechar
                </Text>
              </TouchableOpacity>
            </Item>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <Container>
        {this.state.dataSource === null
          ? this.showLoading()
          : this.showResults()}

        <Footer style={{ height: 50 }}>
          <FooterTab style={styles.footer}>
            <Button>
              <MaterialCommunityIcons
                name="home-outline"
                size={24}
                style={styles.textActive}
              />
              <Text style={styles.textActive}>Início</Text>
            </Button>
            <Button
              onPress={() => {
                this.props.navigation.navigate("Search");
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
            <Button onPress={() => this.props.navigation.navigate("Profile")}>
              <FontAwesome name="user-o" size={24} style={styles.footerIcons} />
              <Text style={styles.footerText}>Perfil</Text>
            </Button>
          </FooterTab>
        </Footer>

        {this.state.modalVisible === true && this.toggleModal()}
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
    color: "#ef5350",
  },
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
