import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Left, Icon, Body, Right, Label, Content, InputGroup, Input } from 'native-base';

export class WidgetScreen extends Component {
    render() {
        return (
            <Container>
                <Header style={{backgroundColor: "#00668f"}}>
                    <Left>
                        <Icon name="ios-arrow-back" style={{marginLeft: 10, color:'#fff' }} onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                    <Body>
                        <Text style={{fontSize:20, fontWeight:'bold', color: '#fff'}} >Widgets</Text>
                    </Body>
                    <Right/>
                </Header>
                
            </Container>
        )
    }
}

export default WidgetScreen
