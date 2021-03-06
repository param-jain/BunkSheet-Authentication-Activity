import React from 'react';
import { connect } from 'react-redux';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Image, KeyboardAvoidingView, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import AnimatedLoader from "react-native-animated-loader";

import { Notifications } from 'expo';
import  registerForPushNotificationsAsync from '../../Services/push_notifications';

import { emailChanged, passwordChanged, loginUser } from '../../Actions/index';

import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../SensitiveData/aws-exports';

Amplify.configure({ Auth: awsConfig });

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            isAuthenticating: false,
            notification: {},
            animation: null,
        }
    }

    componentDidMount() {
        registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        this.setState({ isAuthenticating: true });
        Auth.currentSession()
            .then(data => { 
                console.log("xxx Checking Previously Logged User: "+ data);
                this.setState({ isAuthenticating: false });
                this.props.navigation.navigate('forgotPassword');
            })
            .catch(error => {
                this.setState({ isAuthenticating: false });
                console.log('xxx Error while Checking Previously Logged User: '+ error)}
            ); 
    }

    _handleNotification = (notification) => {
        this.setState({notification: notification});
      };

    onEmailChange(text) {
        text=text.trim();
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        text=text.trim();
        this.props.passwordChanged(text);
    }

    onLoginPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });

        this.setState({ isAuthenticating: true, errorMessage: '' });

        Auth.signIn(this.props.email, this.props.password)
            .then(user => {
                    this.setState({ isAuthenticating: false });
                    //this.props.navigation.navigate('ean_home', user); 
                })
            .catch(err => { 
                this.setState({ isAuthenticating: false });
                this.setState({ errorMessage: err.message }); 
            });
    }

    onSignUpPress() {
        this.setState({ errorMessage: '' });
        this.props.navigation.navigate('signup_1');
    }

    onForgotPwdPress() {
        this.setState({ errorMessage: '' });
        this.props.navigation.navigate('forgotPassword');
    }

    loginButtonDisabled = (email, password) => {
        if (
                (password.length<8)||
                (email.indexOf('.') === -1)||
                (email.split('').filter(x => x === '@').length !== 1)||
                (email.length < 5)
            ) {
            return true;
        } else {
            return false;
        }
    }

    validateEmail = (email) => {
        if (!this.props.emailTouched) {
            return (  
                <View>
                    <TextInput
                        keyboardType={'email-address'}
                        autoCapitalize = 'none'
                        underlineColorAndroid="transparent" 
                        placeholder="Email" 
                        placeholderColor="#c4c3cb" 
                        style={styles.loginFormTextInput} 
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </View>        
            );
        } else {
            if (email.length < 5) {
                return (  
                    <View>
                        <TextInput
                            keyboardType={'email-address'}
                            autoCapitalize = 'none'
                            underlineColorAndroid="transparent" 
                            placeholder="Email" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#DD2C00'}]} 
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                        <Text style={styles.errorMessage}>Email should be at least 5 characters long!</Text>
                    </View>        
                );
            } else if (email.split('').filter(x => x === '@').length !== 1) {
                return (  
                    <View>
                        <TextInput
                            keyboardType={'email-address'}
                            autoCapitalize = 'none'
                            underlineColorAndroid="transparent" 
                            placeholder="Email" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#DD2C00'}]} 
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                        <Text style={styles.errorMessage}>Email should contain '@'</Text>
                    </View>        
                );
            } else if (email.indexOf('.') === -1) {
                return (  
                    <View>
                        <TextInput
                            keyboardType={'email-address'}
                            autoCapitalize = 'none'
                            underlineColorAndroid="transparent" 
                            placeholder="Email" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#DD2C00'}]} 
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                        <Text style={styles.errorMessage}>Email should contain at least one dot (.)</Text>
                    </View>        
                );
            } else {
                return (  
                    <View>
                        <TextInput
                            keyboardType={'email-address'}
                            autoCapitalize = 'none'
                            underlineColorAndroid="transparent" 
                            placeholder="Email" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#1B5E20'}]} 
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                    </View>        
                );
            }
        }
    }

    validatePassword = (password) => {
        if (!this.props.passwordTouched) {
            return (  
                <View>
                    <TextInput
                            underlineColorAndroid="transparent" 
                            placeholder="Password" 
                            placeholderColor="#c4c3cb" 
                            style={styles.loginFormTextInput} 
                            secureTextEntry={true}
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                </View>        
            );
        } else { 
            if (password.length < 8) {
                return (
                    <View>
                         <TextInput
                            underlineColorAndroid="transparent" 
                            placeholder="Password" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#DD2C00'}]} 
                            secureTextEntry={true}
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                        <Text style={styles.errorMessage}>Password should be at least 8 characters long</Text>
                    </View>
                );
            } else {
                return (
                    <View>
                         <TextInput
                            underlineColorAndroid="transparent" 
                            placeholder="Password" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#1B5E20'}]} 
                            secureTextEntry={true}
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                    </View>
                );
            }
        }
    }

    render() {

        if (this.state.isAuthenticating) {
            return (
                <View style={styles.containerView}>
                    <AnimatedLoader
                        visible={this.state.isAuthenticating}
                        overlayColor="rgba(255,255,255,0.75)"
                        source={require("../../Animations/1221-loader-animation.json")}
                        animationStyle={styles.lottie}
                        speed={1}
                    />
                </View>
            );
        }
    
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <StatusBar barStyle = "dark-content" hidden = {true}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerView}>
                    <View style={styles.loginFormView}>
                        <View style={styles.logoImageView}>
                            <Image 
                                style={styles.logoImage}
                                source={require('../../../assets/icon.png')}
                            />
                        </View>
                        <Text style={styles.logoText}>BunkSheet</Text>
                        {this.validateEmail(this.props.email)}
                        {this.validatePassword(this.props.password)}
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={() => this.onLoginPress()}
                            title="Login"
                            disabled={this.loginButtonDisabled(this.props.email, this.props.password)}
                            ViewComponent={require('expo').LinearGradient}
                            linearGradientProps={{
                                colors: ['#FF6F00', '#FFA000'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                        />
                        <TouchableOpacity 
                            style={{flexDirection:'row', justifyContent: 'space-around', marginTop: 10 }} 
                            onPress={() => this.onForgotPwdPress()}
                            >
                            <Text style={{color: '#424242'}} >Forgot Password?</Text>
                        </TouchableOpacity>
                        <View style={styles.rectangle} />
                        <Button
                            buttonStyle={styles.signUpButton}
                            onPress={() => this.onSignUpPress()}
                            title="Sign Up"
                            ViewComponent={require('expo').LinearGradient}
                            linearGradientProps={{
                                colors: ['#FFA000', '#FFC110'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        );
    }
}

const styles = {
    containerView: {
        flex: 1,
    },
    logoImageView: { 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginBottom: 30,
        textAlign: 'center',
    },
    logoImage: {
        marginTop: 10,
    },
    loginFormView: {
        justifyContent: 'center',
        flex: 1,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#777777',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
      
    },
    errorMessage: {
        color: 'red',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: '#FF6D00',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15
    },
    signUpButton: {
        backgroundColor: '#FFAB00',
        borderRadius: 5,
        height: 45,
        marginLeft: 15,
        marginRight: 15,
    },
    rectangle: {
        width: 'auto',
        height: 1,
        backgroundColor: 'blue',
        marginTop: 30,
        marginLeft: 120,
        marginRight: 120,
        marginBottom: 30
    },
    lottie: {
        width: 2*Dimensions.get('window').width/3,
        height: 2*Dimensions.get('window').height/3
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.login.email,
        password: state.login.password,
        emailTouched: state.login.emailTouched,
        passwordTouched: state.login.passwordTouched,
    }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);
