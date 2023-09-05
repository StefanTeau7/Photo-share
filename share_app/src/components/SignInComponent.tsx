import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React, {useRef, useState} from 'react';
import {Animated, Button, TextInput, View} from 'react-native';
import {styles} from '../styles/styles';
import Clipboard from '@react-native-community/clipboard';

const SignInComponent = ({signIn}: {signIn: () => void}) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  const [serverURL, setServerURL] = useState('');

  const handlePaste = async () => {
    const text = await Clipboard.getString();
    setServerURL(text);
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
        onPress={signIn}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#565656'}
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
