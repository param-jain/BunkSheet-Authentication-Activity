import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    StatusBar
  } from 'react-native'

import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux'

import AnimatedLoader from "react-native-animated-loader";

import { signupEmailChanged, signupPasswordChanged, signupVerifyPasswordChanged} from '../../Actions/index'



class Signup_1 extends Component {

    state = { isAuthenticating: false }

    backButtonNavigation() {
        this.props.navigation.navigate('login');
    }

    onEmailChange(text) {
        text=text.trim();
        this.props.signupEmailChanged(text);
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

    onPasswordChange(text) {
        text=text.trim();
        this.props.signupPasswordChanged(text);
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

    onVerifyPasswordChange(text) {
        text=text.trim();
        this.props.signupVerifyPasswordChanged(text);
    }

    validateVerifyPassword = (verifyPassword) => {
        if (!this.props.verifyPasswordTouched) {
            return (  
                <View>
                    <TextInput
                            underlineColorAndroid="transparent" 
                            placeholder="Verify Password" 
                            placeholderColor="#c4c3cb" 
                            style={styles.loginFormTextInput} 
                            secureTextEntry={true}
                            onChangeText={this.onVerifyPasswordChange.bind(this)}
                            value={this.props.verifyPassword}
                        />
                </View>        
            );
        } else {
            if (verifyPassword.length < 8) {
                return (
                    <View>
                         <TextInput
                            underlineColorAndroid="transparent" 
                            placeholder="Verify Password" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#DD2C00'}]} 
                            secureTextEntry={true}
                            onChangeText={this.onVerifyPasswordChange.bind(this)}
                            value={this.props.verifyPassword}
                        />
                        <Text style={styles.errorMessage}>Password should be at least 8 characters long</Text>
                    </View>
                );
            } else if (verifyPassword!=this.props.password) {
                return (
                    <View>
                         <TextInput
                            underlineColorAndroid="transparent" 
                            placeholder="Verify Password" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#DD2C00'}]} 
                            secureTextEntry={true}
                            onChangeText={this.onVerifyPasswordChange.bind(this)}
                            value={this.props.verifyPassword}
                        />
                        <Text style={styles.errorMessage}>Passwords do not match!!!</Text>
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
                            onChangeText={this.onVerifyPasswordChange.bind(this)}
                            value={this.props.verifyPassword}
                        />
                    </View>
                );
            }
        }
    }

    navigateToSignUpDetails() {
        this.props.navigation.navigate('signup_2');
    }

    enableNextButton = (email, password, verifyPassword) => {
        if (
            (password.length<8)||
            (email.indexOf('.') === -1)||
            (email.split('').filter(x => x === '@').length !== 1)||
            (email.length < 5)||
            (verifyPassword.length < 8)||
            (verifyPassword!=password)
            ) {
                return (
                    <TouchableOpacity 
                        style={styles.nextButton}
                        onPress={this.navigateToSignUpDetails.bind(this)}
                        disabled
                        >
                        <Icon
                            raised
                            name='arrow-right'
                            type='entypo'
                            color='#777777'
                            style={styles.nextButtonLayout} 
                        />
                    </TouchableOpacity>
                );
        } else {
            return(
                <TouchableOpacity 
                    style={styles.nextButton}
                    onPress={this.navigateToSignUpDetails.bind(this)}
                    >
                    <Icon
                        raised
                        name='arrow-right'
                        type='entypo'
                        color='#E65100'
                        style={styles.nextButtonLayout} />
                </TouchableOpacity>
            );
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
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle = "dark-content" hidden = {true} translucent = {true}/>
                <Image style={styles.bg} source={require('../../Images/orange-owl-hi.png')} />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>

                        <View style={styles.headerIconView}>
                            <TouchableOpacity style={styles.headerBackButtonView} onPress={this.backButtonNavigation.bind(this)}>
                                <Image style={styles.backButtonIcon} source={require('../../Images/black_back.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerTitleView}>
                            <Text style={styles.titleViewText}>Sign Up</Text>
                        </View>

                        <View style={styles.loginFormView}>
                            {this.validateEmail(this.props.email)}
                            {this.validatePassword(this.props.password)}
                            {this.validateVerifyPassword(this.props.verifyPassword)}
                            {this.enableNextButton(this.props.email, this.props.password, this.props.verifyPassword)}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

let styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
      position: 'absolute',
      left: -25,
      top: 100,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    headerIconView: {
      marginBottom: 10,
      flex: 0.15,
      backgroundColor: 'transparent'
    },
    headerBackButtonView: {
      width: 35,
      height: 35,
      position: 'absolute',
      top: 35,
      left: 15,
      marginBottom: 10
    },
    backButtonIcon: {
      resizeMode: 'contain',
      width: 35,
      height: 25
    },
    headerTitleView: {
      backgroundColor: 'transparent',
      paddingLeft: 25,
      marginBottom:0,
      marginTop: 0
    },
    titleViewText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#EF6C00',
      marginTop: 20,
      marginBottom: 10,
    },
    loginFormView: {
        marginTop: 40,
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
    nextButtonLayout: {
        marginTop: 50,
    },
    nextButton: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        marginTop: 30
    },
    lottie: {
        width: 2*Dimensions.get('window').width/3,
        height: 2*Dimensions.get('window').height/3
    }
  });

const mapStateToProps = (state) => ({
    email: state.signup.email,
    emailTouched: state.signup.emailTouched,
    password: state.signup.password,
    passwordTouched: state.signup.passwordTouched,
    verifyPassword: state.signup.verifyPassword,
    verifyPasswordTouched: state.signup.verifyPasswordTouched,
    isAuthenticating: state.signup.isAuthenticating,
});

export default connect(mapStateToProps, { 
    signupEmailChanged, 
    signupPasswordChanged, 
    signupVerifyPasswordChanged,
})(Signup_1);