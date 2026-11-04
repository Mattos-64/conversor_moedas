import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MoedasScreen() {
  const [moedas, setMoedas] = useState<{ [key: string]: number } | null>(null);
  const [favoritas, setFavoritas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      // Carregar moedas da API
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();
      if (data && data.rates) {
        setMoedas(data.rates);
      }

      // Carregar favoritas 
      const favsSalvas = await AsyncStorage.getItem('@moedas_favoritas');
      if (favsSalvas) {
        setFavoritas(JSON.parse(favsSalvas));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  async function alternarFavorito(moeda: string) {
    let novasFavs = [...favoritas];
    if (novasFavs.includes(moeda)) {
      novasFavs = novasFavs.filter((item) => item !== moeda);
    } else {
      novasFavs.push(moeda);
    }
    setFavoritas(novasFavs);
    await AsyncStorage.setItem('@moedas_favoritas', JSON.stringify(novasFavs));
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#651ee9" />
        <Text style={styles.loadingText}>A carregar moedas...</Text>
      </View>
    );
  }

  const moedasList = moedas ? Object.keys(moedas) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Moedas (Base: USD)</Text>
      <FlatList
        data={moedasList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isFavorita = favoritas.includes(item);
          return (
            <View style={styles.card}>
              <View style={styles.info}>
                <Ionicons name="cash-outline" size={24} color="#651ee9" />
                <Text style={styles.moedaTexto}>{item}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.taxaText}>Taxa: {moedas?.[item]?.toFixed(4)}</Text>
                <TouchableOpacity onPress={() => alternarFavorito(item)}>
                  <Ionicons
                    name={isFavorita ? "star" : "star-outline"}
                    size={24}
                    color={isFavorita ? "#f39c12" : "#999"}
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16, paddingTop: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#333' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333', textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  info: { flexDirection: 'row', alignItems: 'center' },
  rightContainer: { flexDirection: 'row', alignItems: 'center' },
  moedaTexto: { fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 10 },
  taxaText: { fontSize: 14, color: '#666', marginRight: 12 },
  starIcon: { padding: 4 }
});