import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

export class GitHubLogin extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>GitHubLogin</Text>
            </View>
        );
    }
}
export default GitHubLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});