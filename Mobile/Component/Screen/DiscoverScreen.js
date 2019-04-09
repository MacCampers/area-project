import React, { Component } from 'react'
import { Image } from 'react-native';
import { Header, Left, Body, Title, Icon, Right, Container, Content, Text, Card, CardItem, Thumbnail, Button } from 'native-base';

export class DiscoverScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="search" style={{color: tintColor }}/>
        )
    }

    handleButton = () => {

    }
    render() {
        return (
            <Container>
                <Header style={{backgroundColor: "#003c61"}}>
                    <Left/>
                    <Body>
                        <Title style={{color: "#fff"}}>AREA</Title>
                    </Body>
                    <Right>
                        <Icon style={{color: "#fff"}} name="search"/>
                    </Right>
                </Header>
                <Content>
                    <Card style={{flex: 0, marginLeft: 10, marginRight: 10, marginTop: 10}}>
                        <CardItem style={{backgroundColor:"#680931"}}>
                            <Thumbnail source={require("../../assets/weatherMapLogo.png")} style={{width:100, height: 100, marginTop:30}}/>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#680931"}} button onPress={() => this.props.navigation.navigate('Today weather')}>
                            <Text style={{color:"#fff", fontSize:30, marginBottom: 30}} >Get an email with today's weather</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#3a0008"}}>
                            <Left/>
                            <Right>
                                <Button transparent>
                                    <Text style={{color: "#fff"}} >Works with</Text>
                                    <Icon name="email" type="MaterialCommunityIcons" style={{color: "#fff"}}/>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card style={{flex: 0, marginLeft: 10, marginRight: 10, marginTop: 10}}>
                        <CardItem style={{backgroundColor:"#680931"}}>
                            <Thumbnail source={require("../../assets/weatherMapLogo.png")} style={{width:100, height: 100, marginTop:30}}/>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#680931"}} button onPress={() => this.props.navigation.navigate('Tomorrow weather')}>
                            <Text style={{color:"#fff", fontSize:30, marginBottom: 30}} >Get an email with tomorrow's weather</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#3a0008"}}>
                            <Left/>
                            <Right>
                                <Button transparent>
                                    <Text style={{color: "#fff"}} >Works with</Text>
                                    <Icon name="email" type="MaterialCommunityIcons" style={{color: "#fff"}}/>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card style={{flex: 0, marginLeft: 10, marginRight: 10, marginTop: 10}}>
                        <CardItem style={{backgroundColor:"#680931"}}>
                            <Thumbnail source={require("../../assets/weatherMapLogo.png")} style={{width:100, height: 100, marginTop:30}}/>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#680931"}}>
                            <Text style={{color:"#fff", fontSize:30, marginBottom: 30}} >Get an email when it rains</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#3a0008"}}>
                            <Left/>
                            <Right>
                                <Button transparent>
                                    <Text style={{color: "#fff"}} >Works with</Text>
                                    <Icon name="email" type="MaterialCommunityIcons" style={{color: "#fff"}}/>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

export default DiscoverScreen
