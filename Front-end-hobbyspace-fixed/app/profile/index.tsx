import React, { useState } from 'react';
import { AppHeader } from '../../components/Header';

import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import { useRouter } from 'expo-router';
import { profileStyles as styles } from '../../styles/screens/profile.Styles';
import { BottomBar } from '../../components/BottomBar';

// INTEGRAÇÃO
import { useAuth } from '../../context/AuthContext';
import { useMyHobbies } from '../../hooks/useHobbies';

// Mapeamento de tipo de insígnia → imagem local
const BADGE_IMAGES: Record<string, any> = {
  conquistaC1: require('../../assets/conquistaC1.png'),
  conquistaF1: require('../../assets/conquistaF1.png'),
  conquistaM1: require('../../assets/conquistaM1.png'),
  default: require('../../assets/conquistavazia.png'),
};

function getBadgeImage(type: string) {
  return BADGE_IMAGES[type] ?? BADGE_IMAGES.default;
}

export default function Perfil() {

  const router = useRouter();
  const { user, logout } = useAuth();
  const { hobbies, isLoading: loadingHobbies } = useMyHobbies();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const activeHobbies = hobbies.filter(h => h.progressPercent < 100).length;
  const finishedHobbies = hobbies.filter(h => h.progressPercent >= 100).length;

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  const handlePickImage = async () => {

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita acesso à galeria para trocar a foto.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>

      {/* HEADER */}
      <AppHeader
        title="Perfil"
        variant="com-fundo"
        showNotification={true}
        showBackButton={true}
        rightButton="settings"
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* PERFIL */}
        <View style={styles.profileSection}>

          {/* FOTO */}
          <View style={styles.imageContainer}>

            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.profileImg}
              />
            ) : user?.avatarUrl ? (
              <Image
                source={{ uri: user.avatarUrl }}
                style={styles.profileImg}
              />
            ) : (
              <Image
                source={require('../../assets/perfilpadrao.png')}
                style={styles.profileImg}
              />
            )}

            <Pressable
              style={styles.editIconContainer}
              onPress={handlePickImage}
            >
              <MaterialCommunityIcons
                name="pencil"
                size={20}
                color="#FFF"
              />
            </Pressable>

          </View>

          {/* NOME */}
          <Text style={styles.userName}>{user?.name ?? '—'}</Text>

          {/* EMAIL */}
          <Text style={styles.userEmail}>{user?.email ?? '—'}</Text>

        </View>

        {/* ESTATÍSTICAS */}
        <View style={styles.statsRow}>

          <View style={styles.statCard}>
            {loadingHobbies ? (
              <ActivityIndicator size="small" color="#6D28D9" />
            ) : (
              <Text style={styles.statValue}>{activeHobbies}</Text>
            )}
            <Text style={styles.statLabel}>Hobbies{"\n"}Ativos</Text>
          </View>

          <View style={styles.statCard}>
            {loadingHobbies ? (
              <ActivityIndicator size="small" color="#6D28D9" />
            ) : (
              <Text style={styles.statValue}>{finishedHobbies}</Text>
            )}
            <Text style={styles.statLabel}>Hobbies{"\n"}Finalizados</Text>
          </View>

        </View>

        {/* BIOGRAFIA */}
        <Text style={styles.sectionTitle}>Biografia</Text>

        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>
            {user?.bio?.trim()
              ? user.bio
              : 'Ainda está vazio por aqui...'}
          </Text>
        </View>

        {/* INSÍGNIAS */}
        <Text style={styles.sectionTitle}>Insígnias</Text>

        <View style={styles.insigniaRow}>

          {hobbies.slice(0, 4).map((hobby) => (
            <View key={hobby.id} style={styles.insigniaItem}>
              <Image
                source={getBadgeImage(`conquista${hobby.name.charAt(0)}1`)}
                style={styles.insigniaImg}
              />
              <Text
                style={[styles.insigniaLabel, { color: '#9370DB' }]}
              >
                {hobby.name}{"\n"}Nível {hobby.level}
              </Text>
            </View>
          ))}

          {/* Slots vazios */}
          {Array.from({
            length: Math.max(0, 4 - hobbies.slice(0, 4).length),
          }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.insigniaItem}>
              <Image
                source={BADGE_IMAGES.default}
                style={styles.insigniaImg}
              />
              <Text style={styles.insigniaLabel}>Vazio</Text>
            </View>
          ))}

        </View>

        {/* BOTÃO LOGOUT */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginHorizontal: 24,
            marginTop: 16,
            paddingVertical: 14,
            borderRadius: 12,
            backgroundColor: '#FEE2E2',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#DC2626',
              fontWeight: '600',
              fontSize: 15,
            }}
          >
            Sair da conta
          </Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />

      </ScrollView>

      <BottomBar />

    </View>
  );
}