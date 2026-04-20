// Made by Shovith (Sid)
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ScanLine } from 'lucide-react-native';
import GlassCard from '../components/GlassCard';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome back</Text>
      <Text style={styles.header}>Track Your Spending</Text>

      <GlassCard style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>$0.00</Text>
      </GlassCard>

      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.scanButton}
          activeOpacity={0.8}
          onPress={() => router.push('/scanner')}
        >
          <ScanLine color="#0A0A0A" size={24} />
          <Text style={styles.scanButtonText}>Scan Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0A0A0A',
    paddingTop: 80,
  },
  greeting: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
  },
  header: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  balanceCard: {
    marginBottom: 40,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#00FFFF', // Neon cyan accent for the text
    fontSize: 48,
    fontWeight: 'bold',
  },
  actionContainer: {
    alignItems: 'center',
    marginTop: 'auto', // Pushes the button toward the bottom
    marginBottom: 40,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00FFFF', // Solid neon button
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    gap: 12,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  scanButtonText: {
    color: '#0A0A0A',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
