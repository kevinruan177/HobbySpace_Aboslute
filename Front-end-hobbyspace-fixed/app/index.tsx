import { Text, View, Pressable, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { welcomeStyles as styles } from '../styles/screens/welcomeStyles';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function Index() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    // Redireciona automaticamente para home se já estiver logado
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace('/home');
        }
    }, [isAuthenticated, isLoading, router]);

    // Mostra uma tela de loading enquanto verifica autenticação
    if (isLoading) {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/logoG.png')}
                    style={{ width: 100, height: 100 }}
                    resizeMode="contain"
                />
                <Text style={{ color: '#777', marginTop: 20 }}>Carregando...</Text>
            </View>
        );
    }

    // Se já estiver autenticado, não mostra a tela de welcome
    if (isAuthenticated) {
        return null;
    }

    return (
        <View style={styles.container}>

            {/* FUNDO COM IMAGEM */}
            <Image
                source={require('../assets/backgrounds/bg1.png')} // coloque sua imagem aqui
                style={styles.background}
                resizeMode="cover"
            />

            {/* Logo no topo */}
            <Image
                source={require('../assets/logotexto.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Título */}
            <Text style={styles.subtitle}>Seu próximo hobbie começa aqui.</Text>

            {/* Botão principal */}
            <Link href="/auth/register" asChild>
                <Pressable style={styles.mainButton}>
                    <Text style={styles.mainButtonText}>Começar agora →</Text>
                </Pressable>
            </Link>

            {/* Botões menores */}
            <View style={styles.rowButtons}>
                <Link href="/auth/login" asChild>
                    <Pressable style={styles.smallButton}>
                        <View style={styles.buttonContent}>
                            <Ionicons name="log-in-outline" size={18} color="#333" />
                            <Text style={styles.smallButtonText}>Entrar</Text>
                        </View>
                    </Pressable>
                </Link>

             {/* ROTA PARA A HOME NO EXPLORAR */}
        <Link href="/home" asChild> 
            <Pressable style={styles.smallButton}>
                <View style={styles.buttonContent}>
                    <Ionicons name="compass-outline" size={18} color="#333" />
                    <Text style={styles.smallButtonText}>Explorar</Text>
                </View>
            </Pressable>
        </Link>
            </View>

            {/* Estrelas */}
            <Image
                source={require('../assets/starleft.png')}
                style={styles.starLeft}
            />

            <Image
                source={require('../assets/starright.png')}
                style={styles.starRight}
            />

        </View>
        
    );
}
