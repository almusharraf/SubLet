import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme/useTheme';
import { typography } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const NafathScreen: React.FC = () => {
  const [nationalId, setNationalId] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();

  const handleNafathAuth = async () => {
    if (!nationalId) {
      Alert.alert('Error', 'Please enter your National ID');
      return;
    }

    try {
      setLoading(true);
      // TODO: Implement Nafath authentication
      Alert.alert(
        'Nafath Authentication',
        'This is a placeholder for Nafath authentication. The actual implementation will be added later.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('MainTabs'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to authenticate with Nafath');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Nafath Login</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sign in with your National ID
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="National ID"
          placeholderTextColor={colors.textSecondary}
          value={nationalId}
          onChangeText={setNationalId}
          keyboardType="numeric"
          maxLength={10}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleNafathAuth}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            {loading ? 'Authenticating...' : 'Authenticate with Nafath'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.footerLink, { color: colors.primary }]}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    ...typography.h1,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body1,
  },
  form: {
    gap: 16,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    ...typography.body1,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    ...typography.button,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  footerLink: {
    ...typography.button,
  },
});
