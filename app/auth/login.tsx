import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';

import React, { useState } from 'react';
import { Link } from 'expo-router';

export default function LoginScreen() {
  return (
    <ScrollView style={{ paddingTop: 40, backgroundColor: '#1a4a90', paddingHorizontal: 20 }}>
      <TouchableOpacity style={styles.btnBack}>
        <Icon name='arrow-undo-circle' color={'#fff'} size={50} style={{alignSelf: 'center', marginVertical: 'auto'}} />
      </TouchableOpacity>

      <View style={{marginVertical: 70}}>
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

      <Link href='/auth/login'>
        <Text style={{ color: '#ccc', textAlign: 'right' }}>Esqueci a senha!</Text>
      </Link>

      <TouchableOpacity style={styles.btnLogin}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.btnLogin, {backgroundColor: '#ccc', flexDirection: 'row'}]}>
        <Image source={require('@/assets/images/ic-google.png')} style={{width: 30, height: 30 }}/>
        <Text style={{ color: '#111' }}>Sign in With Google</Text>
      </TouchableOpacity>
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