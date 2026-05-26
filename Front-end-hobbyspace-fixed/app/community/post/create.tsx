import React, { useState } from "react";
import {
    View, Text, Image, TextInput, TouchableOpacity,
    ScrollView, Alert, ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

import { AppHeader }          from "../../../components/Header";
import { BottomBar }          from "../../../components/BottomBar";
import { createPostStyles as styles } from "../../../styles/screens/createPostStyles";
import { postService }        from "../../../services/postService";
import { uploadImage }        from "../../../services/cloudinaryService";
import { useAuth }            from "../../../context/AuthContext";

export default function CreatePost() {
    const router = useRouter();
    const { user } = useAuth();
    const { slug: communitySlug } = useLocalSearchParams<{ slug: string }>();

    const [description, setDescription] = useState("");
    const [imageUri,    setImageUri]    = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [loading,     setLoading]     = useState(false);

    // ── Selecionar imagem da galeria ──────────────────────────────────────
    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Precisamos de acesso à sua galeria.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'] as any,
            allowsEditing: true,
            quality: 0.7,
            base64: true,
        });
        if (!result.canceled && result.assets[0]) {
            const asset = result.assets[0];
            setImageUri(asset.uri);
            if (asset.base64) {
                const ext  = asset.uri.split('.').pop()?.toLowerCase() ?? 'jpg';
                const mime = ext === 'png' ? 'image/png'
                           : ext === 'webp' ? 'image/webp'
                           : 'image/jpeg';
                setImageBase64(`data:${mime};base64,${asset.base64}`);
            }
        }
    };

    // ── Publicar: faz upload para Cloudinary ANTES de chamar o backend ────
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
            let imageUrl: string | undefined;

            // 1. Se há imagem selecionada, faz upload direto para o Cloudinary
            if (imageBase64) {
                try {
                    imageUrl = await uploadImage(imageBase64, 'posts');
                } catch (uploadErr: any) {
                    Alert.alert(
                        'Erro no upload',
                        uploadErr.message || 'Não foi possível enviar a imagem. Tente novamente.'
                    );
                    setLoading(false);
                    return;
                }
            }

            // 2. Envia texto + URL (não base64) para o backend
            await postService.create({
                communitySlug: String(communitySlug).trim(),
                text: description.trim(),
                ...(imageUrl ? { imageUrl } : {}),
            });

            // Vai direto para a comunidade — useFocusEffect vai recarregar os posts
            router.replace(`/community/${String(communitySlug).trim()}`);
        } catch (error: any) {
            Alert.alert('Erro', error?.message || 'Não foi possível publicar o post.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
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

                    {/* TEXTO */}
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="No que você está pensando?"
                        placeholderTextColor="#B4B4B4"
                        multiline
                        style={styles.input}
                        editable={!loading}
                    />

                    {/* IMAGEM */}
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

                    {/* PUBLICAR */}
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