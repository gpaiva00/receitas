import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  Platform,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  Container,
  Body,
  Header,
  Input,
  Item,
  Left,
  Button,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Radio,
  Text,
  Right,
  ListItem
} from "native-base";
import SlidingUpPanel from "rn-sliding-up-panel";
import { WebBrowser } from "expo";
import { FontAwesome, Ionicons, EvilIcons } from "@expo/vector-icons";
import api from "../services/api";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

export default class Search extends React.Component {
  state = {
    isLoading: true,
    isPanelVisible: false,
    dataSource: null,
    error: "",
    all: true,
    video: false,
    text: "",
    filter: "null"
  };

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    this.hideLoading();
  }

  search = async (text, filter) => {
    const response = await api.get(`/search/${text}/${filter}`);

    this.setState({ dataSource: response.data.items });
  };

  handleItemPress = link => {
    WebBrowser.openBrowserAsync(link);
  };

  showExternalLinkIcon = () => (
    <FontAwesome name="external-link" size={15} color="black" />
  );

  showYoutubeIcon = () => (
    <FontAwesome name="youtube-play" size={15} color="black" />
  );

  showClearIcon = () => (
    <TouchableOpacity
      style={{ marginRight: 30 }}
      onPress={() => this.setState({ text: "" })}
    >
      <EvilIcons name="close" size={24} />
    </TouchableOpacity>
  );

  renderItems = ({ item }) => {
    return (
      <Card style={{ flex: 0 }}>
        <CardItem
          button
          onPress={() => {
            this.props.navigation.navigate("ReceitaWebView", { receita: item });
          }}
        >
          <Left>
            <Body>
              <Text>{item.title}</Text>
              <Text note>{item.displayLink}</Text>
            </Body>
          </Left>
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
    this.hideLoading();
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={this.renderItems}
        keyExtractor={item => item.link}
      />
    );
  };

  showPanel() {
    return (
      <SlidingUpPanel
        visible={this.state.isPanelVisible}
        onRequestClose={() => this.setState({ isPanelVisible: false })}
        // height={ 200 }
        draggableRange={{ top: 170, bottom: 0 }}
      >
        <Container>
          <ListItem>
            <Left>
              <Text>Todos</Text>
            </Left>
            <Right>
              <Radio selected={this.state.all} onPress={this.handleOptionAll} />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Apenas Vídeo</Text>
            </Left>
            <Right>
              <Radio
                selected={this.state.video}
                onPress={this.handleOptionVideo}
              />
            </Right>
          </ListItem>
          {/* <Button title='Hide' onPress={() => this.setState({isPanelVisible: false})} /> */}
        </Container>
      </SlidingUpPanel>
    );
  }

  showLoading = () => (
    <View>
      <ActivityIndicator size={24} />
    </View>
  );

  hideLoading = () => {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  };

  handleSearchChange = text => {
    this.setState({ text });
  };

  handleSearchPress = () => {
    this.setState({ isLoading: true });
    if (this.state.text != "") {
      this.search(this.state.text, this.state.filter);
    }
  };

  handleOptionAll = () => {
    this.setState({
      filter: "",
      all: true,
      video: false,
      dataSource: null,
      isPanelVisible: false
    });
    this.handleSearchPress();
  };

  handleOptionVideo = () => {
    this.setState({
      filter: "video",
      all: false,
      video: true,
      dataSource: null,
      isPanelVisible: false
    });
    this.handleSearchPress();
  };

  showWelcomeMessage = () => {
    return (
      <Body style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/icons/receitas.png")}
          style={{ width: 70, height: 70 }}
        />
        <Text style={styles.welcomeMessage}>
          Tem alguns ingredientes e não sabe o que preparar? Pesquise aqui e
          encontre receitas deliciosas!
        </Text>
      </Body>
    );
  };

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Item rounded style={{ backgroundColor: "#fff", width: '87%' }}>
            {this.state.isLoading == true ? (
              this.showLoading()
            ) : (
              <Ionicons name="ios-search" size={24} style={{ padding: 5 }} />
            )}
            <Input
              placeholder="Digite os ingredientes"
              onChangeText={this.handleSearchChange}
              onSubmitEditing={this.handleSearchPress}
              value={this.state.text}
              style={{
                marginLeft: 10,
                backgroundColor: "#fff",
                width: "50%",
                height: 40,
                borderRadius: 8
              }}
            />
            {this.state.text != "" && this.showClearIcon()}
          </Item>
            <Button
              transparent
              onPress={() => this.setState({ isPanelVisible: true })}
            >
              <Ionicons
                name="ios-options"
                size={24}
                style={{ color: "#fff" }}
              />
            </Button>
        </Header>

        {this.state.dataSource === null
          ? this.showWelcomeMessage()
          : this.showResults()}

        <Footer style={{ height: 50 }}>
          <FooterTab style={styles.footer}>
            <Button
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <MaterialCommunityIcons name="home-outline" size={24} style={styles.footerIcons}/>
              <Text style={styles.footerText}>Início</Text>
            </Button>
            <Button>
              <Feather name="search" size={24} style={styles.textActive} />
              <Text style={styles.textActive}>Buscar</Text>
            </Button>
            <Button onPress={() => {}}>
              <MaterialCommunityIcons name="heart-outline" size={24} style={styles.footerIcons}/>
              <Text style={styles.footerText}>Favoritos</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Profile")}>
              <FontAwesome name="user-o" size={24} style={styles.footerIcons}/>
              <Text style={styles.footerText}>Perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
        {this.state.isPanelVisible === true && this.showPanel()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ef5350",
    marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.3
  },
  footer: {
    backgroundColor: "#FFF"
  },
  footerIcons: {
    color: "#4C4E52",
  },
  footerText: {
    color: "#999",
    fontSize: 8
  },
  textActive: {
    color: "#ef5350"
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  optionsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray"
  },
  welcomeMessage: {
    color: "gray",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 60,
    width: Dimensions.get("window").width - 50
  }
});
