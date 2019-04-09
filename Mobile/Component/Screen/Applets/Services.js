import React, { Component } from 'react'
import { View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native'

var {width, height} = Dimensions.get('window')

export class Services extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeIndex: 0,
        }
    }

    render() {
        return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 2}}>
            <TouchableOpacity style={{width: (width)/3, height: (width)/ 3, marginBottom: 2, paddingLeft: 2, marginBottom: 2}} onPress={() => this.props.navigation.navigate('Facebook')}>
                <Image source={require('../../../assets/fb.png')} style={{width:undefined, height:undefined, flex:1, borderRadius:10}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{width: (width)/3, height: (width)/ 3, marginBottom: 2, paddingLeft: 2, marginBottom: 2}} >
                <Image source={require('../../../assets/twitter.jpg')} style={{width:undefined, height:undefined, flex:1, borderRadius:10}} />
            </TouchableOpacity>
            <TouchableOpacity style={{width: (width)/3, height: (width)/ 3, marginBottom: 2, paddingLeft: 2, marginBottom: 2}} onPress={() => this.props.navigation.navigate('GitHub')}>
                <Image source={require('../../../assets/GitHub.png')} style={{width:undefined, height:undefined, flex:1}} />
            </TouchableOpacity>
        </View>
        )
    }
}

export default Services
