import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React, {useRef, useState} from 'react';
import {Alert, Animated, Button, TextInput, View} from 'react-native';
import {styles} from '../styles/styles';
import ApiService from '../services/API_Service';
import Clipboard from '@react-native-community/clipboard';

const SignInComponent = ({signIn}: {signIn: () => void}) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current; // Initial value for opacity: 0.5
  const [serverURL, setServerURL] = useState('');

  const handleSignIn = () => {
    if (!serverURL) {
      Alert.alert('Error', 'Server URL is mandatory!');
      return;
    }
    ApiService.setBaseURL(serverURL); // Update the BASE_URL in ApiService
    signIn();
  };

  const handlePaste = async () => {
    const text = await Clipboard.getString();
    setServerURL(text); // Assuming you are using a state variable named serverURL
  };

  Animated.loop(
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  return (
    <View style={styles.center}>
      <Animated.Text style={{...styles.welcomeMessage, opacity: fadeAnim}}>
        Welcome to Our App!
      </Animated.Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleSignIn}
      />
      <TextInput
        style={styles.input} // you should style this input field
        placeholder="Enter Server URL"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setServerURL}
        value={serverURL}
      />
      <Button title="Paste" onPress={handlePaste} />
    </View>
  );
};

export default SignInComponent;
