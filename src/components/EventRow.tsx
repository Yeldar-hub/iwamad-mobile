import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  saved: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export default function EventRow({
  event,
  saved,
  onPress,
  onToggleSaved,
}: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
      style={styles.wrapper}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>
              {saved ? 'Unsave' : 'Save'}
            </Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          delayLongPress={500}
          accessibilityRole="button"
          accessibilityLabel={`${event.title}${saved ? ', saved' : ''}`}
          style={({ pressed }) => [
            styles.row,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.subtitle}>
              {event.date} · {event.place}
            </Text>
            {saved && (
              <Animated.Text entering={ZoomIn} style={styles.saved}>
                ★ Saved
              </Animated.Text>
            )}
          </View>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  row: {
    minHeight: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 18,
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  saved: {
    marginTop: 8,
    color: '#15803D',
    fontSize: 14,
    fontWeight: '700',
  },
  action: {
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    paddingHorizontal: 24,
    borderRadius: 14,
    marginLeft: 8,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
