import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Container, Content, Form, Item, Label, Input, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';

export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: null,
            auth_token: '',
            email: '',
            password: '',
            errorMessage: null,
        };
    }

    handleSignUp = async() => {
        const { email, password } = this.state
        fetch('https://area-api-epitech.azurewebsites.net/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.email,
                "password": this.state.password
            })
        })
        .then(response => {this.setState({code: response.status}); return response.json()})
        .then(res => {
            console.log(this.state.code)
            if(this.state.code != 200){
                Alert.alert(res.login_failure[0])
                console.log(res.login_failure[0])
            }
            else {
                this.setState({ auth_token: res.jwTtoken });
                Alert.alert("Welcome", " You have succesfully logged in");
                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => this.props.navigation.navigate('Home'))
                    .catch(error => this.setState({ errorMessage: error.message }))
            }
        })
        .catch((error) => {
            console.error(error);
        })            
        console.log('handleSignUp')
    }

    render() {
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
                            <Text style={{color:'#fff'}}>Connexion</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default LoginScreen
