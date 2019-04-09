import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SignUpScreen, LoginScreen } from './index'
import { Container, Content, Thumbnail, Tabs, Tab, TabHeading } from 'native-base';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container style={{flex: 1, backgroundColor: "#00668f"}}>
                <Content>
                    <Thumbnail square source={require('../../assets/area_logo.png')} style={{alignSelf:'center', marginTop: 100, width: 150, height:150, marginBottom:50}}/>
                    <Tabs>
                        <Tab heading={ <TabHeading style={{backgroundColor: "#4c94bf"}}><Text style={{color:'#fff'}}>Inscription</Text></TabHeading>}>
                            <SignUpScreen navigation={this.props.navigation}/>
                        </Tab>
                        <Tab heading={ <TabHeading style={{backgroundColor: "#4c94bf"}}><Text style={{color:'#fff'}}>Connexion</Text></TabHeading>}>
                            <LoginScreen navigation={this.props.navigation}/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        );
    }
}

export default WelcomeScreen;
