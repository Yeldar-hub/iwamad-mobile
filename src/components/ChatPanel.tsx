import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';
import { useChat } from '../hooks/useChat';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const canSend = text.trim().length > 0;

  const handleSend = () => {
    if (!canSend) {
      return;
    }
    sendMessage(eventId, text);
    setText('');
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Live chat</Text>

      <View style={styles.composer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message"
          placeholderTextColor="#94A3B8"
          value={text}
          onChangeText={setText}
          maxLength={280}
          accessibilityLabel="Write a message"
        />

        <Pressable
          onPress={handleSend}
          disabled={!canSend}
          accessibilityRole="button"
          accessibilityLabel="Send"
          style={({ pressed }) => [
            styles.sendButton,
            !canSend && styles.sendButtonDisabled,
            pressed && canSend && styles.sendButtonPressed,
          ]}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>

      {status === 'connecting' && (
        <Text style={styles.stateText}>Connecting</Text>
      )}

      {status === 'error' && (
        <Text style={styles.errorText}>Chat unavailable</Text>
      )}

      {status === 'live' && messages.length === 0 && (
        <Text style={styles.stateText}>No messages yet</Text>
      )}

      {status === 'live' && messages.length > 0 && (
        <View style={styles.messagesList}>
          {[...messages].reverse().map((item) => (
            <View key={item.id} style={styles.messageRow}>
              <Text style={styles.messageLine}>
                <Text style={styles.author}>{item.author}: </Text>
                <Text style={styles.messageText}>{item.text}</Text>
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  composer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    minHeight: 44,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0F172A',
  },
  sendButton: {
    backgroundColor: '#2563EB',
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  sendButtonPressed: {
    opacity: 0.85,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  stateText: {
    fontSize: 15,
    color: '#64748B',
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 15,
    color: '#DC2626',
    paddingVertical: 8,
  },
  messagesList: {
    gap: 10,
  },
  messageRow: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  messageLine: {
    fontSize: 15,
    lineHeight: 21,
  },
  author: {
    fontWeight: '700',
    color: '#0F172A',
  },
  messageText: {
    color: '#334155',
  },
});
