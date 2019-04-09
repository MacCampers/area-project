import React, {Component} from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import { Container, Footer, Left, Body, Right, Content, ListItem, Icon, Button, FooterTab, Header} from 'native-base';

class CustomDrawerComponent extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    signOutUser = async () => {
        /*try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }*/
    }
    render () {
        return (
            <Container style={{flex: 1}}>
                <Header>
                    <Left>
                        <Icon name="md-close" onPress={() => this.props.navigation.navigate('Dashboard')}/>
                    </Left>
                    <Body>
                        <Text style={{fontSize: 25, fontWeight:'bold'}}>Settings</Text>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <View>
                        <ListItem style={{marginTop:5}} button icon onPress={this.navigateToScreen('Profile')}>
                            <Text style={{fontSize: 23}} >Profile</Text>
                        </ListItem>
                        <ListItem style={{marginTop:5}} icon onPress={this.navigateToScreen('Account')}>
                            <Text style={{fontSize: 23}}>Account</Text>
                        </ListItem>
                        <ListItem style={{marginTop:5}} icon onPress={this.navigateToScreen('Widget')}>
                            <Text style={{fontSize: 23}}>Widget</Text>
                        </ListItem>
                        <ListItem style={{marginTop:5}} icon onPress={this.navigateToScreen('Widget')}>
                            <Text style={{fontSize: 23}}>Contact us</Text>
                        </ListItem>
                        <ListItem style={{marginTop:5}} icon onPress={() => this.signOutUser()}>
                            <Text style={{fontSize: 23}}>Sign out</Text>
                        </ListItem>
                    </View>
                </Content>
                <Footer>
                    <Left>
                        <Text style={{marginLeft: 20}}>Terms</Text>
                    </Left>
                    <Body/>
                    <Right>
                        <Text style={{marginRight:20}} >v.1.1</Text>
                    </Right>
                </Footer>
            </Container>
        )
    }
};

const styles = StyleSheet.create({
    navSectionStyle: {
        flex: 1,
        alignItems: 'center',
        height: 50,
    },
    navItemStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

CustomDrawerComponent.propTypes = {
    navigation: PropTypes.object
};

export default CustomDrawerComponent;