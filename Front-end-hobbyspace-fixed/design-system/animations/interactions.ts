import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const usePressAnimation = (scale: number = 0.97) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    return () => {
      scaleAnim.setValue(1);
    };
  }, [scaleAnim]);

  const onPressIn = () => {
    scaleAnim.setValue(scale);
  };

  const onPressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return {
    transform: [{ scale: scaleAnim }],
    onPressIn,
    onPressOut,
  };
};

export const usePulseAnimation = (duration: number = 1000) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startPulse = () => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.05,
        duration: duration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: duration / 2,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulse).start();
  };

  const stopPulse = () => {
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
  };

  return {
    transform: [{ scale: pulseAnim }],
    startPulse,
    stopPulse,
  };
};

export const useSpinAnimation = (duration: number = 1000) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  const startSpin = () => {
    spinAnim.setValue(0);
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopSpin = () => {
    spinAnim.stopAnimation();
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return {
    transform: [{ rotate: spin }],
    startSpin,
    stopSpin,
  };
};
