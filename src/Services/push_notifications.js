import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";

export default async () => {

  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log("xxx Push Notifications Service Previous Token: "+previousToken);

  if (previousToken) {
    return;
  } else {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    let token = await Notifications.getExpoPushTokenAsync();

    console.log('xxx Push Notifications Service Current Token: ' + token);
    await axios.post(PUSH_ENDPOINT, token.token)
      .catch(error => console.log('xxx Push Notifications Error: ' + error));

    AsyncStorage.setItem('pushtoken', token);

    this.subscription = Notifications.addListener(this.handleNotification);
  }
};
