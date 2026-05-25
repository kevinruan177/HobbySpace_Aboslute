import React, { useState } from "react";

import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

import { AppHeader } from "../../../components/Header";
import { BottomBar } from "../../../components/BottomBar";
import { createPostStyles as styles } from "../../../styles/screens/createPostStyles";

// INTEGRAÇÃO
import { postService } from "../../../services/postService";
import { useAuth } from "../../../context/AuthContext";

export default function CreatePost() {

    const router = useRouter();
    const { user } = useAuth();

    // Pega o slug da comunidade se vier pela rota (ex: /community/fotografia/post/create)
    const { slug: communitySlug } = useLocalSearchParams<{ slug: string }>();

    const [description, setDescription] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // SELECIONAR IMAGEM DA GALERIA
    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Precisamos de acesso à sua galeria para adicionar fotos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled && result.assets[0]) {
            setImageUri(result.assets[0].uri);
            setImageBase64(result.assets[0].base64 ?? null);
        }
    };

    // PUBLICAR POST
    const handlePublish = async () => {
        if (!description?.trim()) {
            Alert.alert('Atenção', 'Escreva algo antes de publicar.');
            return;
        }

        if (!communitySlug?.trim()) {
            Alert.alert('Erro', 'Comunidade não identificada.');
            return;
        }

        setLoading(true);

        try {
            await postService.create({
                communitySlug: String(communitySlug).trim(),
                text: description.trim(),
                ...(imageBase64 ? { imageBase64 } : {}),
            });

            Alert.alert('Publicado!', 'Seu post foi criado com sucesso.', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error: any) {
            console.error('Erro ao publicar post:', error);
            Alert.alert('Erro', error?.message || 'Não foi possível publicar o post.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <AppHeader
                title="Criar Post"
                variant="com-fundo"
                showBackButton={true}
                showNotification={false}
                rightButton="none"
            />

            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 160 }}
            >
                <View style={styles.content}>

                    {/* PERFIL */}
                    <View style={styles.profileRow}>

                        {user?.avatarUrl ? (
                            <Image source={{ uri: user.avatarUrl }} style={styles.profileImage} />
                        ) : (
                            <Image source={require("../../../assets/perfilpadrao.png")} style={styles.profileImage} />
                        )}

                        <Text style={styles.username}>{user?.name ?? 'Usuário'}</Text>

                    </View>

                    {/* INPUT DE TEXTO */}
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="No que você está pensando?"
                        placeholderTextColor="#B4B4B4"
                        multiline
                        style={styles.input}
                        editable={!loading}
                    />

                    {/* PREVIEW DA IMAGEM OU BOTÃO DE UPLOAD */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.uploadContainer}
                        onPress={handlePickImage}
                        disabled={loading}
                    >
                        {imageUri ? (
                            <Image
                                source={{ uri: imageUri }}
                                style={{ width: '100%', height: '100%', borderRadius: 12 }}
                                resizeMode="cover"
                            />
                        ) : (
                            <Ionicons name="camera" size={90} color="#B4AFE9" />
                        )}
                    </TouchableOpacity>

                    {/* BOTÃO PUBLICAR */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.publishButton}
                        onPress={handlePublish}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.publishText}>Publicar</Text>
                        )}
                    </TouchableOpacity>

                </View>
            </ScrollView>

            <BottomBar />

        </View>
    );
}
