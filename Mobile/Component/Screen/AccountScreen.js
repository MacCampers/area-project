import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Left, Icon, Body, Right, Label, Content, InputGroup, Input } from 'native-base';

export class AccountScreen extends Component {
    render() {
        return (
            <Container>
                <Header style={{backgroundColor: "#00668f"}}>
                    <Left>
                        <Icon name="ios-arrow-back" style={{marginLeft: 10, color:'#fff' }} onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                    <Body>
                        <Text style={{fontSize:20, fontWeight:'bold', color: '#fff'}} >Account</Text>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <View style={{marginLeft:20, marginRight:20}}>
                    <Label style={{marginTop: 20, marginBottom: 5}}>Username</Label>
                        <Input placeholder='username' style={{borderColor:'#00668f', borderWidth: 1, borderRadius: 15}}/>
                        <Label style={{marginTop: 20, marginBottom: 5}}>Email</Label>
                        <Input placeholder='email' style={{borderColor:'#00668f', borderWidth: 1, borderRadius: 15}}/>
                        <Label style={{marginTop: 20, marginBottom:5}}>Password</Label>
                        <Input placeholder='*****' style={{borderColor:'#00668f', borderWidth: 1, borderRadius: 15}}/>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default AccountScreen
