import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Banknote,
  Trash2,
} from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';
import { Button } from '../components/Button';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  type: 'payment' | 'refund';
  amount: number;
  date: Date;
  description: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit',
    last4: '4242',
    expiry: '12/24',
    isDefault: true,
  },
  {
    id: '2',
    type: 'debit',
    last4: '8888',
    expiry: '06/25',
    isDefault: false,
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'payment',
    amount: 850,
    date: new Date('2024-03-15'),
    description: 'Luxury Villa in Riyadh - 2 nights',
  },
  {
    id: '2',
    type: 'refund',
    amount: 350,
    date: new Date('2024-03-10'),
    description: 'Modern Apartment in Jeddah - Cancelled',
  },
  {
    id: '3',
    type: 'payment',
    amount: 450,
    date: new Date('2024-03-05'),
    description: 'AlUla Desert Resort - 1 night',
  },
];

export const WalletScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);

  const handleAddCard = () => {
    navigation.navigate('AddCard');
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleRemoveCard = (id: string) => {
    Alert.alert(
      'Remove Card',
      'Are you sure you want to remove this card?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(prev => prev.filter(method => method.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            paddingTop: insets.top,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Wallet</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Payment methods
          </Text>

          {paymentMethods.map((method) => (
            <View
              key={method.id}
              style={[
                styles.card,
                {
                  backgroundColor: colors.surface,
                  shadowColor: colors.shadow,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  {method.type === 'credit' ? (
                    <CreditCard size={32} color={colors.text} />
                  ) : (
                    <Banknote size={32} color={colors.text} />
                  )}
                </View>
                <View style={styles.cardContent}>
                  <Text style={[styles.cardType, { color: colors.text }]}>
                    {method.type === 'credit' ? 'Credit Card' : 'Debit Card'}
                  </Text>
                  <Text
                    style={[styles.cardNumber, { color: colors.textSecondary }]}
                  >
                    •••• •••• •••• {method.last4}
                  </Text>
                  <Text
                    style={[styles.cardExpiry, { color: colors.textSecondary }]}
                  >
                    Expires {method.expiry}
                  </Text>
                </View>
              </View>
              
              <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                <View style={styles.defaultToggle}>
                  <Text style={[styles.defaultText, { color: colors.textSecondary }]}>
                    Set as default
                  </Text>
                  <Switch
                    value={method.isDefault}
                    onValueChange={() => handleSetDefault(method.id)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveCard(method.id)}
                >
                  <Trash2 size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <Button
            onPress={handleAddCard}
            variant="outline"
            style={styles.addCardButton}
          >
            Add payment method
          </Button>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent transactions
          </Text>

          {mockTransactions.map((transaction) => (
            <View
              key={transaction.id}
              style={[styles.transaction, { borderColor: colors.border }]}
            >
              <View style={styles.transactionIcon}>
                {transaction.type === 'payment' ? (
                  <ArrowUpRight
                    size={24}
                    color={colors.error}
                    style={styles.transactionIconInner}
                  />
                ) : (
                  <ArrowDownLeft
                    size={24}
                    color={colors.success}
                    style={styles.transactionIconInner}
                  />
                )}
              </View>
              <View style={styles.transactionContent}>
                <Text
                  style={[styles.transactionDescription, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {transaction.description}
                </Text>
                <Text
                  style={[
                    styles.transactionDate,
                    { color: colors.textSecondary },
                  ]}
                >
                  {transaction.date.toLocaleDateString()}
                </Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  {
                    color:
                      transaction.type === 'payment'
                        ? colors.error
                        : colors.success,
                  },
                ]}
              >
                {transaction.type === 'payment' ? '-' : '+'}﷼{transaction.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: spacing.headerHeight + 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerTitle: {
    ...typography.h3,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  card: {
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  cardIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  cardType: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  cardNumber: {
    ...typography.bodySmall,
    marginBottom: spacing.xs,
  },
  cardExpiry: {
    ...typography.bodySmall,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderTopWidth: 1,
  },
  defaultToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultText: {
    ...typography.body,
    marginRight: spacing.md,
  },
  removeButton: {
    padding: spacing.xs,
  },
  addCardButton: {
    marginTop: spacing.md,
  },
  divider: {
    height: 8,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionIconInner: {
    transform: [{ rotate: '45deg' }],
  },
  transactionContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  transactionDescription: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  transactionDate: {
    ...typography.bodySmall,
  },
  transactionAmount: {
    ...typography.body,
    marginLeft: spacing.md,
  },
}); 