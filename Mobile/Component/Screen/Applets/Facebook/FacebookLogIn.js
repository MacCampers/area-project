import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

export class FacebookLogIn extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>FacebookLogIn</Text>
            </View>
        );
    }
}
export default FacebookLogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});