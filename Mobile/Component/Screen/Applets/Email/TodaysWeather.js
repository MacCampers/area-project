import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Header, Left, Body, Title, Icon, Right, Container, Content, Text, Card, CardItem, Thumbnail, Button } from 'native-base';
import SwitchSelector from "react-native-switch-selector";

export class TodaysWeather extends Component {
    constructor () {
        super();
    
        this.state = {
            active: 0
        };
    }
    render() {
        return (
            <Container>
                <Content>
                    <Card style={{flex: 0, marginLeft: 15, marginRight: 15, marginTop: 15}}>
                        <CardItem style={{backgroundColor:"#680931"}} >
                            <Image source={require("../../../../assets/weatherMapLogo.png")} style={{resizeMode:'contain', height:80, width:140, marginTop:30}} />
                        </CardItem>
                        <CardItem style={{backgroundColor:"#680931"}}>
                            <Text style={{color:"#fff", fontSize:30, marginBottom: 10}} >Get an email with today's weather</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#680931"}} >
                            <Text style={{color:"#fff", marginBottom: 5}}>
                                Receive an email with today's weather
                            </Text>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#680931"}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "center", marginBottom: 10}}>
                                <Text style={{color:"#fff", textAlign: 'center'}}>by</Text>
                                <Image  style={{width: 30, height: 30}} source={require("../../../../assets/area_logo.png")}/>
                                <Text style={{color:"#fff", textAlign: 'center', fontWeight: 'bold', fontSize:15}}>Area team</Text>
                            </View>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#680931"}}>
                            <SwitchSelector
                                style={{marginBottom: 30}}
                                initial={0}
                                onPress={value => this.setState({ active: value })}
                                height={100}
                                textColor={'#680931'} //
                                selectedColor={'#fff'}
                                buttonColor={'#680931'}
                                borderColor={'#680931'}
                                hasPadding
                                options={[
                                    { label: "Off", value: "0", }, 
                                    { label: "On", value: "1", }
                                ]}
                                />
                        </CardItem>
                        <CardItem footer style={{backgroundColor:"#3a0008"}}>
                            <Left>
                                <Icon  style={{color: "#fff", marginRight: 5}} name='person'/>
                                <Text style={{color: "#fff"}}>50k </Text>
                            </Left>
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

export default TodaysWeather
