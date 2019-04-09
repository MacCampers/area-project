import React, {Component} from 'react';
import { Platform, Dimensions } from 'react-native'
import {Icon} from 'native-base'
import CustomDrawerComponent from './Component/Screen/CustomDrawerComponent'
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'
import { SignUpScreen, ProfileScreen, AuthLoadingScreen, WelcomeScreen, LoginScreen, DiscoverScreen, MyAppletScreen, AccountScreen, WidgetScreen} from './Component/Screen'
import { FollowersNotification } from './Component/Screen/Applets/Youtube'
import { TodaysWeather, TomorrowsWeather } from './Component/Screen/Applets/Email'
import { GitHubLogIn } from './Component/Screen/Applets/GitHub'
import { FacebookLogIn } from './Component/Screen/Applets/Facebook'

var {width, height} = Dimensions.get('window')

const DiscoverNavigator = createStackNavigator(
    {
        Home : {
            screen: DiscoverScreen,
            navigationOptions: {
                header: null,
            }
        },
        Youtube : {screen: FollowersNotification},
        'Today weather' : {screen: TodaysWeather},
        'Tomorrow weather': {screen: TomorrowsWeather}
    },
    {
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="search" style={{color: tintColor }}/>
            )
        }
    }
)

const AppletNavigator = createStackNavigator(
    {
        Home: {
            screen: MyAppletScreen,
            navigationOptions: {
                header: null
            }
        },
        GitHub: {screen: GitHubLogIn},
        Facebook: {screen: FacebookLogIn}
    },
    {
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-apps" style={{color: tintColor}}/>
            )
        }
    }
)

const TabNavigator = createBottomTabNavigator(
    {
        'Discover': DiscoverNavigator,
        'My Applets': AppletNavigator,
    },
    {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            activeTintColor:"#003c61",
            inactiveTintColor: '#d1cece',
        }
    }
);

const AppDrawerNavigator = createDrawerNavigator(
    {
        Dashboard: {
            screen: TabNavigator,
        },
        Profile: {
            screen: ProfileScreen,
        },
        Account: {
            screen: AccountScreen,
        },
        Widget: {
            screen: WidgetScreen
        }
    },
    {
        drawerPosition: 'left',
        drawerWidth: width,
        contentComponent: CustomDrawerComponent,
        contentOptions: {
            activeTintColor :'#ffffff',
            inactiveTintColor :'#4c94bf',
            activeBackgroundColor :'#4c94bf',
            inactiveBackgroundColor :'#ffffff',
        }
    }
);

const AuthStack = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen,
            navigationOptions: {
                header: null,
            }
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: {
                header: null,
            }
        },
        LogIn: {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
            }
        },
        Home: {
            screen: AppDrawerNavigator,
            navigationOptions: {
                header: null,
            }
        }
    }
)

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: {screen: AuthLoadingScreen},
        Auth: {screen: AuthStack}
    },
    {
        initialRouteName: 'AuthLoading',
    }
));