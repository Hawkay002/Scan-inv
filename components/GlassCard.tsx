// Made by Shovith (Sid)
import { BlurView } from 'expo-blur';
import { View, StyleSheet, ViewProps } from 'react-native';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
}

export default function GlassCard({ children, style, ...props }: GlassCardProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <BlurView intensity={40} tint="dark" style={styles.glass}>
        {children}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.15)', // Subtle neon edge
    backgroundColor: 'rgba(10, 10, 10, 0.4)', // Deep transparent base
    shadowColor: '#00FFFF', // Soft neon glow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  glass: {
    padding: 24,
  },
});
