import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Container, Content, Form, Item, Label, Input, Button, Text } from 'native-base';
import firebase from 'react-native-firebase'

export class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
        };
    }

    writeUserData(email){
        firebase.database().ref('UsersList/').set({
            'Email': email,
            'FacebookToken': '',
            'GithubToken': '',
            'GoogleToken': '',
            'TwitterToken': '',
            'jwTtoken': '',
        }).then((data)=>{
            //console.log('data ' , data)
        }).catch((error)=>{
            console.log('error ' , error)
        })
    }

    handleSignUp = async() => {
        fetch('https://area-api-epitech.azurewebsites.net/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.email,
                "password": this.state.password
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.errors[0] != null) {
                Alert.alert("Error", json.errors[0].description)
            }
            else {
                Alert.alert("Succeed", "Account created successfully")
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => this.props.navigation.navigate('Home'))
                    .catch(error => this.setState({ errorMessage: error.message }))
            }
        })
    console.log('handleSignUp')
    }

    render() {
        this.writeUserData(this.state.email)
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{color: '#00668f'}}>Email</Label>
                            <Input style={{color: '#00668f'}}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                autoCapitalize='none'
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label style={{color: '#00668f'}}>Password</Label>
                            <Input secureTextEntry style={{color: '#00668f'}}
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                                autoCapitalize='none'
                            />
                        </Item>
                        <Button full rounded style={{marginTop:40, alignSelf:"center", width:250, backgroundColor:"#00668f", height:50}} onPress={this.handleSignUp}>
                            <Text style={{color:'#fff'}}>Inscription</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default SignUpScreen
