import {
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Input } from '../../components/Input';
import { registerStyles as styles } from '../../styles/screens/registerStyles';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const router = useRouter();
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name?.trim() || !email?.trim() || !password?.trim() || !confirmPassword?.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        if (name.trim().length < 3) {
            Alert.alert('Erro', 'O nome deve ter pelo menos 3 caracteres.');
            return;
        }

        // Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            Alert.alert('Erro', 'Por favor, insira um e-mail válido');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        setLoading(true);

        try {
            await register({ name: name.trim(), email: email.trim(), password });
            router.replace('/home');
        } catch (error: any) {
            console.error('Erro ao registrar:', error);
            Alert.alert('Erro ao cadastrar', error?.message || 'Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Background */}
            <Image
                source={require('../../assets/backgrounds/bg2.png')}
                style={styles.background}
                resizeMode="cover"
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1, width: '100%' }}
            >
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: 40
                    }}
                    showsVerticalScrollIndicator={false}
                >

                    {/* BOTÃO VOLTAR */}
                    <TouchableOpacity
                        onPress={() => router.replace('/')}
                        style={{
                            alignSelf: 'flex-start', marginLeft: 4, marginTop: 8, marginBottom: 4,
                            flexDirection: 'row', alignItems: 'center', gap: 6, padding: 8,
                        }}
                    >
                        <Ionicons name="arrow-back" size={20} color="#6D28D9" />
                        <Text style={{ color: '#6D28D9', fontWeight: '700', fontSize: 14 }}>Voltar</Text>
                    </TouchableOpacity>

                    <Image
                        source={require('../../assets/logoG.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.title}>HobbySpace</Text>
                    <Text style={styles.subtitle}>
                        Junte-se à maior comunidade de entusiastas!
                    </Text>

                    {/* CARD */}
                    <View style={styles.card}>

                        {/* NOME */}
                        <Text style={styles.label}>NOME</Text>
                        <Input
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor="#9CA3AF"
                            placeholder='seu nome'
                        />

                        {/* EMAIL */}
                        <Text style={styles.label}>EMAIL</Text>
                        <Input
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            autoCapitalize='none'
                            placeholder='seu@email.com'
                        />

                        {/* SENHA */}
                        <Text style={styles.label}>SENHA</Text>
                        <Input
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                            placeholder='********'
                        />

                        {/* CONFIRMAR SENHA */}
                        <Text style={styles.label}>CONFIRMAR SENHA</Text>
                        <Input
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                            placeholder='********'
                        />

                        {/* BOTÃO */}
                        <TouchableOpacity
                            onPress={handleRegister}
                            disabled={loading}
                            style={{ width: '100%', marginTop: 20 }}
                        >
                            <LinearGradient
                                colors={['#6D28D9', '#9333EA']}
                                style={styles.gradientButton}
                            >
                                <Text style={styles.buttonText}>
                                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* TERMOS */}
                        <View style={styles.termsContainer}>
                            <Text style={styles.termsText}>
                                ☑ Aceitar os <Text style={styles.termsLink}>termos de uso</Text>
                            </Text>
                        </View>

                        {/* DIVIDER */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.line} />
                            <Text style={styles.dividerText}>Ou entre com</Text>
                            <View style={styles.line} />
                        </View>

                        {/* GOOGLE */}
                        <TouchableOpacity style={styles.googleButton}>
                            <Text style={styles.googleText}>Google</Text>
                        </TouchableOpacity>

                    </View>

                    {/* FOOTER */}
                    <TouchableOpacity onPress={() => router.push('/auth/login')}>
                        <Text style={styles.loginText}>
                            Já possui uma conta? <Text style={styles.link}>Entrar</Text>
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
