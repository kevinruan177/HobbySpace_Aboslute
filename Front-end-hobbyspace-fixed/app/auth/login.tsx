import React, { useState } from 'react';

import {
    Text,
    View,
    Pressable,
    Image,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';

import { loginStyles as styles } from '../../styles/screens/loginStyles';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';

export default function Login() {

    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        if (!email?.trim() || !password?.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        // Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            Alert.alert('Erro', 'Por favor, insira um e-mail válido');
            return;
        }

        setLoading(true);

        try {
            await login({ email: email.trim(), password });
            router.replace('/home');
        } catch (error: any) {
            Alert.alert(
                'Erro ao entrar',
                error?.message || 'Verifique seu e-mail e senha e tente novamente.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <View style={styles.container}>

            {/* BACKGROUND */}
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
                    contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                >

                    {/* LOGO */}
                    <Image
                        source={require('../../assets/logoG.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    {/* TÍTULO */}
                    <Text style={styles.title}>HobbySpace</Text>
                    <Text style={styles.subtitle}>Bem-vindo de volta!</Text>

                    {/* CARD */}
                    <View style={styles.card}>

                        {/* EMAIL */}
                        <Text style={styles.label}>EMAIL</Text>
                        <Input
                            value={email}
                            onChangeText={setEmail}
                            placeholder="seu@email.com"
                            placeholderTextColor="#9CA3AF"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            style={styles.input}
                        />

                        {/* SENHA */}
                        <View style={styles.passwordHeader}>
                            <Text style={styles.label}>SENHA</Text>
                            <TouchableOpacity>
                                <Text style={styles.forgot}>Esqueceu sua senha?</Text>
                            </TouchableOpacity>
                        </View>

                        <Input
                            value={password}
                            onChangeText={setPassword}
                            placeholder="********"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                            style={styles.input}
                        />

                        {/* BOTÃO */}
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={handleLogin}
                            disabled={loading}
                            style={{ width: '100%', marginTop: 22 }}
                        >
                            <LinearGradient
                                colors={['#6D28D9', '#9333EA']}
                                style={styles.gradientButton}
                            >
                                <Text style={styles.buttonText}>
                                    {loading ? 'Entrando...' : 'Entrar'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* DIVIDER */}
                        <View style={styles.divider}>
                            <View style={styles.line} />
                            <Text style={styles.dividerText}>Ou entre com</Text>
                            <View style={styles.line} />
                        </View>

                        {/* GOOGLE (placeholder — requer OAuth) */}
                        <Pressable style={styles.googleButton}>
                            <Image
                                source={require('../../assets/google.png')}
                                style={styles.googleIcon}
                            />
                            <Text style={styles.googleText}>Google</Text>
                        </Pressable>

                    </View>

                    {/* FOOTER */}
                    <TouchableOpacity onPress={() => router.push('/auth/register')}>
                        <Text style={styles.footerText}>
                            Não possui uma conta?{' '}
                            <Text style={styles.link}>Cadastre-se</Text>
                        </Text>
                    </TouchableOpacity>

                </ScrollView>

            </KeyboardAvoidingView>

        </View>
    );
}
