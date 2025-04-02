import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text >This screen doesn't exist.</Text>
        <Link href='/(tabs)' style={styles.link}>
          <Text >Go to home screen!</Text>
        </Link>
        <Link href='/auth/login' style={styles.link}>
          <Text >Go to login screen!</Text>
        </Link>
        <Link href='/auth/register' style={styles.link}>
          <Text >Go to register screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
