import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useHolidays } from '../hooks/useHolidays';

type HolidayNoteProps = {
  date: string;
};

export function HolidayNote({ date }: HolidayNoteProps) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text style={styles.note}>Checking holidays</Text>;
  }

  if (isError || !data) {
    return <Text style={styles.note}>Holidays unavailable</Text>;
  }

  const match = data.find((holiday) => holiday.date === date);

  return (
    <Text style={styles.note}>
      {match ? `Public holiday: ${match.name}` : 'Not a public holiday'}
    </Text>
  );
}

const styles = StyleSheet.create({
  note: {
    fontSize: 14,
    color: '#2563EB',
    marginTop: 4,
    fontWeight: '500',
  },
});
