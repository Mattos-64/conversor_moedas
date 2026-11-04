import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Sobre() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sobre</Text>
      
      <View style={styles.card}>
        <Ionicons name="information-circle-outline" size={24} color="black" />

        <Text style={styles.descricao}>
          Este aplicativo foi desenvolvido como um projeto de faculdade.{'/n'} 
          Tendo intuito de realizar a conversão de valores de moedas ( EX: Real para Dolar )
        </Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },

  descricao: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },

  botao: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
  },
});




       