import React, {useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

const SignInComponent = ({signIn}: {signIn: () => void}) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current; // Initial value for opacity: 0.5

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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeMessage: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
});

export default SignInComponent;
