import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function MoedasLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#651ee9', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Moedas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color || '#651ee9'} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritas"
        options={{
          tabBarLabel: 'Favoritas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color || '#651ee9'} />
          ),
        }}
      />
      <Tabs.Screen
        name="converter"
        options={{
          tabBarLabel: 'Converter',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="repeat-outline" size={size} color={color || '#651ee9'} />
          ),
        }}
      />
    </Tabs>
  );
}