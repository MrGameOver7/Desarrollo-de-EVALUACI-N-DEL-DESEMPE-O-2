import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ProductsProvider } from '@/context/ProductsContext';

export default function RootLayout() {
  return (
    <ProductsProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Productos' }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Detalle' }} />
      </Stack>
    </ProductsProvider>
  );
}
