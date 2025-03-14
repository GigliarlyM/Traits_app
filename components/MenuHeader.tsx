import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Divider, Menu } from 'react-native-paper'
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';

const MenuHeader = () => {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      style={{marginTop: 40}}
      anchor={
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{padding: 5,  margin: 10}}
        >
          <IconSimpleLine
            name='options-vertical'
            size={30} color="#fff"
          />
        </TouchableOpacity>
      }
    >
      <Menu.Item title={<Text>Perfil</Text>} />
      <Menu.Item title={<Text>Configuracoes</Text>} />
      <Divider/>
      <Menu.Item onPress={() => router.replace('/auth/login')} title={<Text>Logout</Text>} />
    </Menu>
  )
}

export default MenuHeader;