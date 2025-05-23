import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/components/UserContext';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import httpService from '@/service/httpService';

export default function LoginScreen() {
  return (
    <ScrollView style={{ paddingTop: 40, backgroundColor: '#1a4a90', paddingHorizontal: 20 }}>

      <View style={{ marginVertical: 70 }}>
        <Text style={[styles.text, { fontSize: 32, textAlign: 'center' }]}>Seja Bem-Vindo!</Text>
        <Text style={[styles.text, { textAlign: 'center', color: '#bbb' }]}>Preencha seus dados ou continue com Midias sociais</Text>
      </View>

      <FormLogin />
    </ScrollView>
  )
}

const FormLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const route = useRouter()
  const { addAuth, addName, addEmail } = useAuth()

  const confirmAuth = async () => {
    try {
      const response = await httpService.post('/login', { email, senha: password })
      
      if (response.token) {
        // se possivel, fazer uma requisicao para pegar o nome do ser humano
        addAuth(response.token)
        addEmail(response.email)
        addName(response.name)
        route.push('/(tabs)')
      }
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro ao tentar realizar o login. Tente novamente.')
    }
  }

  return (
    <View >
      <Text style={styles.text}>Email:</Text>
      <TextInput
        placeholder="example@example.com"
        style={styles.input}
        value={email}
        onChangeText={setEmail} />

      <Text style={styles.text}>Senha:</Text>
      <TextInput
        placeholder="******"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword} />

      <Text style={{ color: '#ccc', textAlign: 'right' }}>Esqueci a senha!</Text>

      <TouchableOpacity style={styles.btnLogin} onPress={() => confirmAuth()}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btnLogin, { backgroundColor: '#ccc', flexDirection: 'row' }]}>
        <Image source={require('@/assets/images/ic-google.png')} style={{ width: 30, height: 30 }} />
        <Text style={{ color: '#111' }}>Sign in With Google</Text>
      </TouchableOpacity>

      <Link href='/auth/register'>
        <Text style={{ color: '#ccc', textAlign: 'center' }}>Novo Usuário? Registre-se</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  btnBack: {
    position: 'absolute',
    top: 20,
    left: 0
  },
  btnLogin: {
    backgroundColor: '#00f',
    padding: 10,
    borderRadius: 5,
    paddingVertical: 15,
    marginVertical: 20
  },
  text: {
    color: '#fff',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 0,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
  }
});