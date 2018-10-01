import React from 'react';
import { WebView } from 'react-native';

const ReceitaWebView = ({ navigation }) => (
    <WebView source={{uri: navigation.state.params.receita.link}} />
);

ReceitaWebView.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.receita.title,
    headerStyle: {
        backgroundColor: "#ef5350",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: '200'
    }
});

export default ReceitaWebView;