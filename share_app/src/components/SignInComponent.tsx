import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React, {useRef} from 'react';
import {Animated, View} from 'react-native';
import {styles} from '../styles/styles';

const SignInComponent = ({signIn}: {signIn: () => void}) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current;

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
    </View>
  );
};

export default SignInComponent;
