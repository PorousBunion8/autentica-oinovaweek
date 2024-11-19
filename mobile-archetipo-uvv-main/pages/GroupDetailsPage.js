import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { supabase } from '../Utils/supabase';

export default function GroupDetailsPage({ route }) {
  const { grupoId } = route.params; // Obtém o id do grupo passado pela navegação
  const [grupo, setGrupo] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);

  // Função para buscar o grupo e suas avaliações
  const fetchGroupDetails = async () => {
    try {
      // Buscando os detalhes do grupo
      const { data: grupoData, error: grupoError } = await supabase
        .from('Grupos')
        .select('*')
        .eq('id', grupoId)
        .single(); // Usando single() para garantir que só receba um grupo

      if (grupoError) {
        console.error('Erro ao buscar grupo:', grupoError.message);
        return;
      }

      setGrupo(grupoData);

      // Buscando as avaliações do grupo
      const { data: avaliacoesData, error: avaliacoesError } = await supabase
        .from('Avaliacoes')
        .select('*')
        .eq('id_grupo', grupoId);

      if (avaliacoesError) {
        console.error('Erro ao buscar avaliações:', avaliacoesError.message);
        return;
      }

      setAvaliacoes(avaliacoesData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchGroupDetails();
  }, [grupoId]);

  return (
    <SafeAreaView style={styles.container}>
      {grupo ? (
        <ScrollView contentContainerStyle={styles.detailsContainer}>
          <Text style={styles.groupTitle}>{grupo.nome}</Text>
          <Text style={styles.groupDescription}>{grupo.descricao}</Text>

          <View style={styles.avaliacoesContainer}>
            {avaliacoes.length > 0 ? (
              avaliacoes.map((avaliacao) => (
                <View key={avaliacao.id} style={styles.avaliacaoCard}>
                  <Text style={styles.avaliacaoText}>{avaliacao.descricao}</Text>
                  <Text style={styles.avaliacaoNota}>Nota: {avaliacao.nota}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noAvaliacoesText}>Sem avaliações</Text>
            )}
          </View>
        </ScrollView>
      ) : (
        <Text>Carregando...</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#021E73',
  },
  groupDescription: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
  },
  avaliacoesContainer: {
    marginTop: 20,
  },
  avaliacaoCard: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  avaliacaoText: {
    fontSize: 16,
    color: '#333',
  },
  avaliacaoNota: {
    fontSize: 16,
    color: '#021E73',
    fontWeight: 'bold',
    marginTop: 5,
  },
  noAvaliacoesText: {
    fontSize: 16,
    color: '#888',
  },
});
