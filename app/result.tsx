// Made by Shovith (Sid)
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Check, ArrowLeft } from 'lucide-react-native';
import GlassCard from '../components/GlassCard';

export default function ResultScreen() {
  const { data } = useLocalSearchParams();
  
  // Parse the data safely
  let receiptData = { storeName: '', total: 0, items: [] };
  try {
    if (typeof data === 'string') {
      receiptData = JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to parse receipt data", e);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
          <ArrowLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Complete</Text>
        <View style={{ width: 44 }} /> {/* Spacer for alignment */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Total Summary Card */}
        <GlassCard style={styles.summaryCard}>
          <Text style={styles.storeName}>{receiptData.storeName || 'Store'}</Text>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>${receiptData.total?.toFixed(2) || '0.00'}</Text>
        </GlassCard>

        <Text style={styles.sectionTitle}>Recognized Items</Text>

        {/* Items List inside GlassCard */}
        <GlassCard style={styles.itemsCard}>
          {receiptData.items?.map((item: any, index: number) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price?.toFixed(2)}</Text>
            </View>
          ))}
          {receiptData.items?.length === 0 && (
            <Text style={styles.itemName}>No items found.</Text>
          )}
        </GlassCard>

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          activeOpacity={0.8}
          onPress={() => router.replace('/')}
        >
          <Check color="#0A0A0A" size={20} />
          <Text style={styles.saveButtonText}>Save to History</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  summaryCard: {
    alignItems: 'center',
    marginBottom: 32,
  },
  storeName: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    marginBottom: 12,
  },
  totalLabel: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 8,
  },
  totalAmount: {
    color: '#00FFFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemsCard: {
    marginBottom: 32,
    paddingVertical: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  itemName: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
    paddingRight: 16,
  },
  itemPrice: {
    color: '#00FFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FFFF',
    paddingVertical: 16,
    borderRadius: 100,
    gap: 8,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  saveButtonText: {
    color: '#0A0A0A',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
