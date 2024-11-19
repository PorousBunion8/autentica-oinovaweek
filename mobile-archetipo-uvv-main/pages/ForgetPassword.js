import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Button, ImageBackground, View, TextInput, Image } from 'react-native';
import UVv_Campus from '../assets/UVv_Campus.jpg';
import UVv_Logo from '../assets/UVV.png';
import { supabase } from '../Utils/supabase'; // Importando o supabase
import { useNavigation } from '@react-navigation/native'; // Para navegação

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState(''); // Armazenando o email
  const [message, setMessage] = useState(''); // Para armazenar a mensagem de erro ou sucesso
  const [messageColor, setMessageColor] = useState(''); // Para armazenar a cor da mensagem

  const navigation = useNavigation(); // Navegação para redirecionamento após cadastro

  // Função para lidar com o esqueci a senha
  const handleForgetPassword = async () => {
    try {
      // Verificar se o email existe na tabela 'Alunos'
      const { data, error } = await supabase
        .from('Alunos')
        .select('email')
        .eq('email', email)
        .single();

      if (error || !data) {
        // Se o email não for encontrado
        setMessage('Email não encontrado. Verifique o e-mail digitado.');
        setMessageColor('red'); // Definindo a cor da mensagem de erro
        return;
      }

      // Se o email for encontrado, simula o envio de uma mensagem de recuperação
      setMessage('Uma mensagem de recuperação foi enviada para o seu e-mail.');
      setMessageColor('green'); // Cor verde para sucesso
    } catch (error) {
      console.error('Erro inesperado:', error);
      setMessage('Ocorreu um erro. Tente novamente.');
      setMessageColor('red'); // Definindo a cor da mensagem de erro
    }
  };

  return (
    <ImageBackground style={styles.background} source={UVv_Campus}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={UVv_Logo} />
        <Text style={styles.title}>Esqueci minha Senha</Text>

        {/* Campo de input para o email */}
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail} // Atualiza o estado do email
          value={email}          // Passa o valor do estado
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#999"
        />

        {/* Exibe a mensagem de erro ou sucesso */}
        {message ? (
          <Text style={[styles.message, { color: messageColor }]}>
            {message}
          </Text>
        ) : null}

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Enviar Recuperação"
              color="#021E73"
              onPress={handleForgetPassword} // Chama a função ao pressionar o botão
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
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
