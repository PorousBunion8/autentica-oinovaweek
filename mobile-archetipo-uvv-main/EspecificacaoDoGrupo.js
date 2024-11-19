import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';

export default function EspecificacaoDoGrupo({ route }) {
  const { group } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Detalhes do Grupo</Text>
      <View style={styles.card}>
        <Text style={styles.props}>Nome do grupo:</Text>
        <Text>{group.nome}</Text>

        <Text style={styles.props}>Descrição do projeto:</Text>
        <Text>{group.descricao}</Text>

        <Text style={styles.props}>Integrantes:</Text>
        {group.integrantes && group.integrantes.length > 0 ? (
          group.integrantes.map((integrante, index) => (
            <Text key={index} style={styles.integrante}>• {integrante}</Text>
          ))
        ) : (
          <Text>Sem integrantes</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  props: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  integrante: {
    marginLeft: 10,
    color: '#555',
  },
});
