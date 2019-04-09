import React, { Component } from 'react'
import { Header, Left, Body, Title, Icon, Right, Container, Content, Tabs, Tab, TabHeading, Text, ScrollableTab } from 'native-base';
import { Services } from './Applets'

export class MyAppletScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-apps" style={{color: tintColor}}/>
        )
    }
    render() {
        return (
            <Container>
                <Header style={{backgroundColor: "#003c61"}}>
                    <Left >
                        <Icon style={{color: "#fff"}} name="md-settings" onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                    <Body>
                        <Title style={{color: "#fff"}}>My Applets</Title>
                    </Body>
                    <Right>
                        <Icon style={{color: "#fff"}} name="md-add"/>
                    </Right>
                </Header>
                <Content>
                    <Tabs>
                        <Tab heading={ <TabHeading style={{backgroundColor: "#4c94bf"}}><Text style={{color:'#fff'}}>All</Text></TabHeading>}>

                        </Tab>
                        <Tab heading={ <TabHeading style={{backgroundColor: "#4c94bf"}}><Text style={{color:'#fff'}}>Services</Text></TabHeading>}>
                            <Services navigation={this.props.navigation}/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}

export default MyAppletScreen
