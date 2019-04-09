import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.loadApp();
    }

    loadApp = async() => {
        const userToken = await AsyncStorage.getItem('userToken')
        this.props.navigation.navigate(userToken ? 'App' : 'Auth')
    };

    render() {
        return (
        <View style={styles.container}>
            <Text> Loading... </Text>
            <ActivityIndicator/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
});

export default AuthLoadingScreen;
