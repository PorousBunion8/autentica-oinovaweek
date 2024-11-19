import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Button, ImageBackground, View, TextInput, Image, Alert } from 'react-native';
import UVv_Campus from '../assets/UVv_Campus.jpg';
import UVv_Logo from '../assets/UVV.png';
import { supabase } from '../Utils/supabase'; // Importando o supabase
import { useNavigation } from '@react-navigation/native'; // Para navegação

export default function RegisterPage() {
  const [email, setEmail] = useState(''); // Armazenando o email
  const [password, setPassword] = useState(''); // Armazenando a senha
  const [confirmPassword, setConfirmPassword] = useState(''); // Armazenando a confirmação de senha
  const [nome, setNome] = useState(''); // Armazenando o nome
  const [loading, setLoading] = useState(false); // Estado para controle de loading

  const navigation = useNavigation(); // Navegação para redirecionamento após cadastro

  // Função para lidar com o cadastro
  const handleSignUp = async () => {
    setLoading(true); // Ativando o carregamento

    // Verificação de senhas
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      setLoading(false);
      return;
    }

    // Verificando se todos os campos estão preenchidos
    if (!email || !password || !nome) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      // **Aqui a ideia é fazer o insert com os dados diretamente, sem passar pela criação de conta do Supabase**

      // Inserindo os dados na tabela Alunos
      const { data, error: insertError } = await supabase
        .from('Alunos') // Referência à tabela de Alunos
        .insert([{
          nome: nome,        // Nome que o usuário digitou
          email: email,      // Email que o usuário digitou
          senha: password,   // Senha que o usuário digitou
          // Sem o campo 'id_grupo' já que foi removido
        }]);

      if (insertError) {
        Alert.alert('Erro', `Erro ao registrar na tabela de alunos: ${insertError.message}`);
        setLoading(false);
        return;
      }

      // Sucesso no cadastro
      Alert.alert('Sucesso', 'Dados registrados com sucesso!');
      navigation.navigate('Login'); // Redirecionando para a tela de login
      setLoading(false); // Desativando o carregamento
    } catch (error) {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <ImageBackground style={styles.background} source={UVv_Campus}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={UVv_Logo} />
        <Text style={styles.title}>Crie sua Conta</Text>

        {/* Campos de input para o cadastro */}
        <TextInput
          style={styles.textInput}
          onChangeText={setNome}  // Atualiza o estado nome
          value={nome}           // Passa o valor do estado
          placeholder="Nome Completo"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail} // Atualiza o estado email
          value={email}          // Passa o valor do estado
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword} // Atualiza o estado senha
          value={password}          // Passa o valor do estado
          placeholder="Senha"
          secureTextEntry={true}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setConfirmPassword} // Atualiza o estado confirmação de senha
          value={confirmPassword}          // Passa o valor do estado
          placeholder="Confirmar Senha"
          secureTextEntry={true}
          placeholderTextColor="#999"
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title={loading ? "Criando..." : "Criar Conta"} // Mudança no texto durante o carregamento
              color="#021E73"
              onPress={handleSignUp}  // Aciona a função de cadastro
              disabled={loading} // Desabilita o botão enquanto o processo está em andamento
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '85%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#ffffffcc',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#021E73',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#021E73',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    width: '60%',
  },
});
