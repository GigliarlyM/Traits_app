import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { cpf } from 'cpf-cnpj-validator'

import { Link, useRouter } from 'expo-router';
import httpService from '@/service/httpService';
import { useAuth } from '@/components/UserContext';

export default function RegisterScreen() {
    return (
        <ScrollView style={{ paddingTop: 40, backgroundColor: '#1a4a90', paddingHorizontal: 20 }}>

            <View style={{ marginVertical: 70 }}>
                <Text style={[styles.text, { fontSize: 32, textAlign: 'center' }]}>Crie uma conta</Text>
                <Text style={[styles.text, { textAlign: 'center', color: '#bbb' }]}>Preencha de acordo com seus dados ou continue com mídia social</Text>
            </View>

            <FormRegister />
        </ScrollView>
    )
}

async function handleSignIn(data: any) {
    const { email, senha, usuario } = data
    const response = await httpService.post('/client', {
        nome: usuario,
        email: email,
        senha: senha
    })

    console.log("Requisicao recevida")
    useAuth().addName(usuario)
    useRouter().replace('/auth/login')
}

const schema = yup.object({
    usuario: yup.string().required("Digite seu nome"),
    email: yup.string().email("Email Inválido").required("Digite seu email"),
    cpf: yup.string().test('cpf-valido', 'CPF Invalido', (value) => cpf.isValid(value!)).required('CPF eh obrigatorio'),
    senha: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos"),
    senhaRepetida: yup.string().oneOf([yup.ref("senha")], "As senhas devem ser iguais").required("Repita sua senha")
})

const FormRegister = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            usuario: "",
            email: "",
            cpf: "",
            senha: ""
        }
    })

    return (
        <View >

            <Text style={styles.text}>Digite seu nome:</Text>
            <Controller
                control={control}
                name='usuario'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Nome"
                        style={[styles.input, {
                            borderWidth: errors.usuario && 1,
                            borderColor: errors.usuario && '#ff375b'
                        }]}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange} />
                )}
            />
            {errors.usuario && <Text style={styles.labelError}>{errors.usuario?.message}</Text>}


            <Text style={styles.text}>Email:</Text>
            <Controller
                control={control}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="example@example.com"
                        style={[styles.input, {
                            borderWidth: errors.email && 1,
                            borderColor: errors.email && '#ff375b'
                        }]}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange} />
                )}
            />
            {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}


            <Text style={styles.text}>Cpf:</Text>
            <Controller
                control={control}
                name='cpf'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="***.***.***-**"
                        style={[styles.input, {
                            borderWidth: errors.cpf && 1,
                            borderColor: errors.cpf && '#ff375b'
                        }]}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange} />
                )}
            />
            {errors.cpf && <Text style={styles.labelError}>{errors.cpf?.message}</Text>}


            <Text style={styles.text}>Senha:</Text>
            <Controller
                control={control}
                name='senha'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="******"
                        style={[styles.input, {
                            borderWidth: errors.senha && 1,
                            borderColor: errors.senha && '#ff375b'
                        }]}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={true} />
                )}
            />
            {errors.senha && <Text style={styles.labelError}>{errors.senha?.message}</Text>}

            <Text style={styles.text}>Repita sua senha:</Text>
            <Controller
                control={control}
                name='senhaRepetida'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="******"
                        style={[styles.input, {
                            borderWidth: errors.senhaRepetida && 1,
                            borderColor: errors.senhaRepetida && '#ff375b'
                        }]}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={true} />
                )}
            />
            {errors.senhaRepetida && <Text style={styles.labelError}>{errors.senhaRepetida?.message}</Text>}

            <TouchableOpacity style={styles.btnLogin}>
                <Text style={{ color: '#fff', textAlign: 'center' }} onPress={handleSubmit(handleSignIn)}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnLogin, { backgroundColor: '#ccc', flexDirection: 'row' }]}>
                <Image source={require('@/assets/images/ic-google.png')} style={{ width: 30, height: 30 }} />
                <Text style={{ color: '#111' }}>Sign in With Google</Text>
            </TouchableOpacity>

            <Link href='/auth/login'>
                <Text style={{ color: '#ccc', textAlign: 'center' }}>Já tem uma conta? Faça Login</Text>
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
    },
    labelError: {
        alignSelf: 'flex-start',
        color: '#ff375b',
        marginBottom: 8
    }
});