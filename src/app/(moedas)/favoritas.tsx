import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function FavoritasScreen() {
  const [favoritas, setFavoritas] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarFavoritas();
    }, [])
  );

  async function carregarFavoritas() {
    try {
      const favsSalvas = await AsyncStorage.getItem('@moedas_favoritas');
      if (favsSalvas) {
        setFavoritas(JSON.parse(favsSalvas));
      } else {
        setFavoritas([]);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritas:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Moedas Favoritas</Text>
      {favoritas.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="star-outline" size={48} color="#ccc" />
          <Text style={styles.vazioText}>Nenhuma moeda favoritada ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={favoritas}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.info}>
                <Ionicons name="star" size={24} color="#f39c12" />
                <Text style={styles.moedaTexto}>{item}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16, paddingTop: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333', textAlign: 'center' },
  vazioText: { marginTop: 10, color: '#666', fontSize: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  info: { flexDirection: 'row', alignItems: 'center' },
  moedaTexto: { fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 10 },
});