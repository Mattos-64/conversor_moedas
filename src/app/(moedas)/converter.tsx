import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ConverterScreen() {
  const [moedas, setMoedas] = useState<{ [key: string]: number } | null>(null);
  const [origem, setOrigem] = useState('BRL');
  const [destino, setDestino] = useState('USD');
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState<{ valorConvertido: number; taxa: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          setMoedas(data.rates);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar taxas:', err);
        setLoading(false);
      });
  }, []);

  function handleConverter() {
    if (!moedas || !valor) return;

    const numValor = parseFloat(valor.replace(',', '.'));
    if (isNaN(numValor)) return;

    // A API tem base USD. 
    // Taxa de origem para USD = 1 / moedas[origem]
    // Taxa de USD para destino = moedas[destino]
    const taxaOrigemParaUSD = 1 / moedas[origem];
    const taxaUSDparaDestino = moedas[destino];
    const taxaConversao = taxaOrigemParaUSD * taxaUSDparaDestino;

    const valorConvertido = numValor * taxaConversao;

    setResultado({
      valorConvertido,
      taxa: taxaConversao,
    });
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#651ee9" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Converter Moeda</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Moeda Origem (Ex: BRL, USD, EUR)</Text>
        <TextInput
          style={styles.input}
          value={origem}
          onChangeText={(text) => setOrigem(text.toUpperCase())}
          maxLength={3}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Moeda Destino (Ex: USD, EUR, GBP)</Text>
        <TextInput
          style={styles.input}
          value={destino}
          onChangeText={(text) => setDestino(text.toUpperCase())}
          maxLength={3}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Valor *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 100"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleConverter}>
        <Ionicons name="repeat" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.botaoTexto}>Calcular Conversor</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultCard}>
          <Text style={styles.resultInfo}>
            {valor} {origem} equivale a
          </Text>
          <Text style={styles.resultValue}>
            {resultado.valorConvertido.toFixed(5)} {destino}
          </Text>
          <Text style={styles.resultTaxa}>
            Taxa de conversão utilizada: {resultado.taxa.toFixed(5)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 40, backgroundColor: '#f8f9fa', flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 5 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  botao: { backgroundColor: '#651ee9', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 8, marginTop: 10 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultCard: { marginTop: 25, backgroundColor: '#fff', padding: 20, borderRadius: 8, elevation: 3, borderLeftWidth: 5, borderLeftColor: '#651ee9' },
  resultInfo: { fontSize: 14, color: '#666' },
  resultValue: { fontSize: 24, fontWeight: 'bold', color: '#333', marginVertical: 8 },
  resultTaxa: { fontSize: 12, color: '#888' },
});