// ProgressBar.tsx
import { StampCard } from "@/lib/api/stamps/stamps.types";
import React, { useEffect, useRef } from 'react';
import {
  AccessibilityProps,
  Animated,
  StyleSheet,
  View
} from 'react-native';

type ProgressBarProps = {
  /** 0..100 */
  progress: number;
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  borderRadius?: number;
  animated?: boolean;
  animationDuration?: number;
};

/**
 * Utility function to compute progression amount for a stamp card. 
 * @param stampCard 
 * @returns A value between 0 and 100
 */
export function computeStampCardProgress(stampCard: StampCard): number {
  if (stampCard.stampProgram.stampsRequired === 0) {
    return 0;
  } else if (stampCard.stampRecords.length >= stampCard.stampProgram.stampsRequired) {
    return 100;
  } else {
    return (stampCard.stampRecords.length / stampCard.stampProgram.stampsRequired) * 100;
  }
}

/**
 * Simple, full-width horizontal progress bar.
 * - progress: number between 0 and 100
 * - animated: smooth transition when progress changes
 */
export function ProgressBar({
  progress,
  height = 6,
  backgroundColor = '#e6e6e6',
  fillColor = '#2f86ff',
  borderRadius = 4,
  animated = true,
  animationDuration = 500,
}: ProgressBarProps & AccessibilityProps) {
  const boundedProgress = Math.max(0, Math.min(100, Number(progress) || 0));
  const progressAnim = useRef(new Animated.Value(boundedProgress)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: boundedProgress,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(boundedProgress);
    }
  }, [boundedProgress, animated, animationDuration, progressAnim]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor,
            borderRadius,
          },
        ]}
        accessibilityRole="progressbar"
        accessibilityState={{ busy: boundedProgress < 100 }}
        accessibilityValue={{ min: 0, max: 100, now: boundedProgress }}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              backgroundColor: fillColor,
              borderRadius,
              width: widthInterpolated,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: '#333',
    alignSelf: 'flex-end',
  },
});