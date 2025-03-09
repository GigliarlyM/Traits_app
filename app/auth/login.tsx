import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';

import React, { useState } from 'react';

export default function LoginScreen() {
  return (
    <View style={{ marginTop: 40 }}>
      <FormLogin />
    </View>
  )
}

const FormLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        placeholder="example@example.com"
        style={{ marginBottom: 10, paddingHorizontal: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}
        value={email}
        onChangeText={setEmail} />

      <Text>Senha:</Text>
      <TextInput
        placeholder="******"
        secureTextEntry={true}
        style={{ marginBottom: 10, paddingHorizontal: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}
        value={password}
        onChangeText={setPassword} />

      <TouchableOpacity style={{ backgroundColor: '#00f', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ backgroundColor: '#ccc', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: '#000', textAlign: 'center' }}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  )
}