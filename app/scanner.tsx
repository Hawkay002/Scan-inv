// Made by Shovith (Sid)
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import { processReceiptImage } from '../utils/visionApi';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.grantButton} onPress={requestPermission}>
          <Text style={styles.grantButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && !isProcessing) {
      setIsProcessing(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({ 
          base64: true, 
          quality: 0.5 
        });
        
        if (photo?.base64) {
          // Send base64 to our Vision API utility
          const receiptData = await processReceiptImage(photo.base64);
          
          // Navigate to the result screen with the parsed data
          router.replace({
            pathname: '/result',
            params: { data: JSON.stringify(receiptData) }
          });
        }
      } catch (error) {
        console.error("Failed to process image:", error);
        setIsProcessing(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        <View style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
              <X color="#FFF" size={24} />
            </TouchableOpacity>
          </View>

          {/* Scanner Frame */}
          <View style={styles.frameContainer}>
            <View style={styles.frame} />
          </View>

          {/* Bottom Controls */}
          <View style={styles.controls}>
            {isProcessing ? (
              <View style={styles.processingContainer}>
                <ActivityIndicator size="large" color="#00FFFF" />
                <Text style={styles.processingText}>Analyzing Receipt...</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureInner} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    padding: 24,
  },
  permissionText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  grantButton: {
    backgroundColor: '#00FFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 100,
  },
  grantButtonText: {
    color: '#0A0A0A',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.4)', // Dark tint over the camera
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'flex-start',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: '80%',
    height: '60%',
    borderWidth: 2,
    borderColor: '#00FFFF',
    borderRadius: 24,
    backgroundColor: 'transparent',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  controls: {
    paddingBottom: 60,
    alignItems: 'center',
    height: 120,
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00FFFF',
  },
  processingContainer: {
    alignItems: 'center',
    gap: 12,
  },
  processingText: {
    color: '#00FFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
