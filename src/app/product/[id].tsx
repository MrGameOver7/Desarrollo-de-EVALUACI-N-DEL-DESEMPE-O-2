import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useProducts } from '@/context/ProductsContext';
import { formatPrice } from '@/utils/format';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getProductById } = useProducts();

  const product = getProductById(Number(id));

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.description}>Producto no encontrado.</Text>
        <Pressable style={styles.button} onPress={goBack}>
          <Text style={styles.buttonText}>Volver a la lista</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} contentFit="contain" transition={200} />
      </View>

      <Text style={styles.category}>{product.category.toUpperCase()}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>

      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Pressable style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Volver a la lista</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    gap: 8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  imageWrapper: {
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#6b7280',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  sectionTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  button: {
    marginTop: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
