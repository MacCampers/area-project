import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Left, Icon, Body, Right, Label } from 'native-base';

export class ProfileScreen extends Component {
    render() {
        return (
            <Container>
                <Header style={{backgroundColor: "#00668f"}}>
                    <Left>
                        <Icon name="ios-arrow-back" style={{marginLeft: 10, color:'#fff' }} onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                    <Body>
                        <Text style={{fontSize:20, fontWeight:'bold', color: '#fff'}} >Profile</Text>
                    </Body>
                    <Right>
                        <Icon type="MaterialCommunityIcons" name="pencil" style={{marginRight: 10, color:'#fff'}}/>
                    </Right>
                </Header>
                <View style={{flex:1,justifyContent: "center",alignItems: "center", backgroundColor: '#e1e2e1'}}>
                    <Label style={{fontSize:25, fontWeight:'bold', color: '#00668f'}}>anto20166</Label>
                    <View
                        style={{
                            marginTop: 25,
                            borderBottomColor: '#00668f',
                            borderBottomWidth: 3,
                            width: 300
                        }}/>
                </View>
            </Container>
        )
    }
}

export default ProfileScreen
