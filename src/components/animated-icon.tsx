import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  Keyframe,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;
const DURATION = 1800;

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      opacity: 1,
    },
    70: {
      opacity: 1,
    },
    100: {
      opacity: 0,
      easing: Easing.out(Easing.ease),
    },
  });

  const content = (
    <View style={styles.content}>
      <Image
        style={styles.splashLogo}
        source={require('@/assets/branding/logo-splash.png')}
        contentFit="contain"
      />

      <Text style={styles.title}>UnivAgenda</Text>

      <Text style={styles.subtitle}>
        Organiza tu vida universitaria
      </Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="none"
      presentationStyle="fullScreen"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={() => setVisible(false)}
    >
      {animate ? (
        <Animated.View
          entering={splashKeyframe.duration(DURATION).withCallback(
            (finished) => {
              'worklet';

              if (finished) {
                scheduleOnRN(setVisible, false);
              }
            }
          )}
          style={styles.splashOverlay}
        >
          {content}
        </Animated.View>
      ) : (
        <View
          onLayout={() => {
            SplashScreen.hideAsync().finally(() => {
              setAnimate(true);
            });
          }}
          style={styles.splashOverlay}
        >
          {content}
        </View>
      )}
    </Modal>
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View
        entering={keyframe.duration(600)}
        style={styles.background}
      />

      <Animated.View
        style={styles.imageContainer}
        entering={logoKeyframe.duration(600)}
      >
        <Image
          style={styles.appLogo}
          source={require('@/assets/branding/logo-app.png')}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#2F4B84',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 14,
  },
  splashLogo: {
    width: 160,
    height: 160,
  },
  title: {
    color: '#F5F6FA',
    fontFamily: 'FredokaBold',
    fontSize: 32,
    textAlign: 'center',
  },
  subtitle: {
    color: '#F5F6FA',
    fontFamily: 'Fredoka',
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    zIndex: 100,
  },
  appLogo: {
    width: 100,
    height: 100,
  },
  background: {
    borderRadius: 40,
    backgroundColor: '#2F4B84',
    width: 128,
    height: 128,
    position: 'absolute',
  },
});
