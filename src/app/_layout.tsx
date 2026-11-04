import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: '#651ee9',
        }}
      >
        <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Início",
          title: "Início - Conversor",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color || '#651ee9'} size={size} />
          ),
        }}
        />
        <Drawer.Screen
          name="sobre"
          options={{
            drawerLabel: "Sobre",
            title: "Sobre",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle-outline" color={color || '#651ee9'} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="(moedas)"
          options={{
            drawerLabel: "Moedas & Conversão",
            title: "Conversor de Moedas",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="swap-horizontal-outline" color={color || '#651ee9'} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}