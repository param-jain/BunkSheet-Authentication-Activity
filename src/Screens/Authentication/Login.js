import React from 'react';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Image, KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import { Notifications } from 'expo';
import  registerForPushNotificationsAsync from '../../Services/push_notifications';


import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../SensitiveData/aws-exports';

Amplify.configure({ Auth: awsConfig });

class Login extends React.Component {

    componentDidMount() {
        registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        this.setState({ isAuthenticating: true });
        Auth.currentSession()
            .then(data => { 
                console.log("xxx Checking Previously Logged User: "+ data);
                this.setState({ isAuthenticating: false });
                //this.props.navigation.navigate('ean_home');
            })
            .catch(error => {
                this.setState({ isAuthenticating: false });
                console.log('xxx Error while Checking Previously Logged User: '+ error)}
            ); 
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabaasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
                <Text>Blabasasla</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
}

export default Login;