import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Button, ImageBackground, View, ScrollView } from 'react-native';
import { supabase } from '../Utils/supabase';
import UVv_Campus from '../assets/UVv_Campus.jpg';

export default function MainPage({ navigation }) {
  const [grupos, setGrupos] = useState([]); // Armazena os grupos

  // Função para buscar os grupos
  const fetchGrupos = async () => {
    try {
      const { data: gruposData, error: gruposError } = await supabase
        .from('Grupos')
        .select('*');

      if (gruposError) {
        console.error('Erro ao buscar grupos:', gruposError.message);
        return;
      }

      setGrupos(gruposData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // Usando o useEffect para buscar os dados quando a página for carregada
  useEffect(() => {
    fetchGrupos();
  }, []);

  return (
    <ImageBackground style={styles.background} source={UVv_Campus}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.groupsContainer}>
          {grupos.map((grupo) => (
            <View key={grupo.id} style={styles.groupCard}>
              <Text style={styles.groupTitle}>{grupo.nome}</Text>
              <Button
                title="Saiba mais"
                onPress={() => navigation.navigate('GroupDetails', { grupoId: grupo.id })}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    width: '100%',
  },
  groupsContainer: {
    marginTop: 100,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  groupCard: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#021E73',
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#021E73',
  },
});
