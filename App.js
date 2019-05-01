import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';

import Login from './src/Screens/Authentication/Login';


export default class App extends React.Component {
  render() {

    const AuthNavigator = createBottomTabNavigator ({
      login: { screen:  Login, navigationOptions: {tabBarVisible: false}},
    }, {
      navigationOptions: {
        tabBarVisible: false
      }
    });
    
    const MainNavigator = createBottomTabNavigator ({
      //welcome: ,
      auth: AuthNavigator,
      //main: 
    });

    const AppContainer = createAppContainer(MainNavigator);
    return (
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <View style={styles.container}>
          <AppContainer
            ref={nav => {
              this.navigator = nav;
            }}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
