import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Container, Header, Content, Card, CardItem, Left, Right, Button, Icon, Thumbnail } from 'native-base';
import SwitchSelector from "react-native-switch-selector";

export class FollowersNotification extends Component {
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
                        <CardItem style={{backgroundColor:"#ff0000"}} >
                            <Image source={require("../../../../assets/youtubeLogo.png")} style={{resizeMode:'contain', height:80, width:140, marginTop:30}} />
                        </CardItem>
                        <CardItem style={{backgroundColor:"#ff0000"}}>
                            <Text style={{color:"#fff", fontSize:30, marginBottom: 10}} >Notify me when a video of my followers are posted</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#ff0000"}} >
                            <Text style={{color:"#fff", marginBottom: 5}}>
                                Receive a notification when a video of my follower is posted
                            </Text>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#ff0000"}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "center", marginBottom: 10}}>
                                <Text style={{color:"#fff", textAlign: 'center'}}>by</Text>
                                <Image  style={{width: 30, height: 30}} source={require("../../../../assets/area_logo.png")}/>
                                <Text style={{color:"#fff", textAlign: 'center', fontWeight: 'bold', fontSize:15}}>Area team</Text>
                            </View>
                        </CardItem>
                        <CardItem style={{backgroundColor:"#ff0000"}}>
                            <SwitchSelector
                                style={{marginBottom: 30}}
                                initial={0}
                                onPress={value => this.setState({ active: value })}
                                height={100}
                                textColor={'#ff0000'} //
                                selectedColor={'#fff'}
                                buttonColor={'#ff0000'}
                                borderColor={'#ff0000'}
                                hasPadding
                                options={[
                                    { label: "Off", value: "0", }, 
                                    { label: "On", value: "1", }
                                ]}
                                />
                        </CardItem>
                        <CardItem footer style={{backgroundColor:"#c20000"}}>
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

export default FollowersNotification
