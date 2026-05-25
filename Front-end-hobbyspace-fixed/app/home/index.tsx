import React, { useState } from 'react';
import { AppHeader } from "../../components/Header";

import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useRouter } from 'expo-router';

import {
  Ionicons,
  FontAwesome5,
  MaterialIcons
} from '@expo/vector-icons';

import { homestyles as styles } from '../../styles/screens/homeStyles';
import { BottomBar } from "../../components/BottomBar";

// INTEGRAÇÃO
import { useMyHobbies, useDiscoverHobbies } from '../../hooks/useHobbies';
import { useAuth } from '../../context/AuthContext';

export default function Home() {

  const router = useRouter();
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  // HOOKS REAIS
  const { hobbies: myHobbies, isLoading: loadingMy } = useMyHobbies();
  const { hobbies: discoverHobbies, isLoading: loadingDiscover } = useDiscoverHobbies(search);

  return (
    <View style={{ flex: 1 }}>

      {/* HEADER */}
      <AppHeader
        title="HobbySpace"
        variant="com-fundo"
        showNotification={true}
        rightButton="settings"
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* ================= MEUS HOBBIES ================= */}
        <View style={styles.sectionHeader}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.sectionTitle}>Meus Hobbies</Text>
            <MaterialIcons
              name="info-outline"
              size={18}
              color="#CCC"
              style={{ marginLeft: 8 }}
            />
          </View>

          <Pressable onPress={() => router.push('/home/myhobbies')}>
            <Text style={styles.verMais}>Ver Todos</Text>
          </Pressable>

        </View>

        {/* LOADING MEUS HOBBIES */}
        {loadingMy ? (
          <ActivityIndicator color="#6D28D9" style={{ marginVertical: 16 }} />
        ) : myHobbies.length === 0 ? (
          <Text style={{ color: '#999', marginLeft: 20, marginBottom: 12 }}>
            Você ainda não tem hobbies. Explore abaixo!
          </Text>
        ) : (
          myHobbies.map((hobby) => (
            <View key={hobby.id} style={styles.hobbyCard}>

              <View style={styles.cardHeader}>

                <View style={styles.iconContainer}>
                  <FontAwesome5 name="star" size={20} color="#4B0082" />
                </View>

                <Text style={styles.hobbyName}>{hobby.name}</Text>

                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{hobby.level}</Text>
                </View>

              </View>

              {/* BARRA DE PROGRESSO */}
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${hobby.progressPercent}%` }
                  ]}
                />
              </View>

              <Text style={styles.percentText}>{hobby.progressPercent}%</Text>

            </View>
          ))
        )}

        {/* ================= DESCOBRIR ================= */}
        <Text style={[styles.sectionTitle, { marginLeft: 20, marginTop: 20, marginBottom: 15 }]}>
          Descobrir
        </Text>

        {/* BARRA DE PESQUISA */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            placeholder="Explore novos hobbies..."
            style={styles.searchInput}
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* GRID DESCOBRIR */}
        {loadingDiscover ? (
          <ActivityIndicator color="#6D28D9" style={{ marginVertical: 20 }} />
        ) : (
          <View style={styles.gridContainer}>

            {/* COLUNA ESQUERDA */}
            <View style={styles.column}>
              {discoverHobbies
                .filter((_, i) => i % 2 === 0)
                .map((hobby) => (
                  <TouchableOpacity
                    key={hobby.id}
                    activeOpacity={0.85}
                    onPress={() => router.push(`/community/${hobby.communitySlug}`)}
                    style={[styles.discoverCard, { height: 220 }]}
                  >
                    <ImageBackground
                      source={
                        hobby.coverImageUrl
                          ? { uri: hobby.coverImageUrl }
                          : require('../../assets/hobbyspace.png')
                      }
                      style={styles.discoverImg}
                      imageStyle={styles.imageRadius}
                    >
                      <View style={styles.cardOverlay}>
                        <Text style={styles.cardTitle}>{hobby.name}</Text>
                        <Text style={styles.cardSub}>
                          {hobby.membersCount.toLocaleString('pt-BR')} Pessoas
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
            </View>

            {/* COLUNA DIREITA */}
            <View style={styles.column}>
              {discoverHobbies
                .filter((_, i) => i % 2 !== 0)
                .map((hobby) => (
                  <TouchableOpacity
                    key={hobby.id}
                    activeOpacity={0.85}
                    onPress={() => router.push(`/community/${hobby.communitySlug}`)}
                    style={[styles.discoverCard, { height: 220 }]}
                  >
                    <ImageBackground
                      source={
                        hobby.coverImageUrl
                          ? { uri: hobby.coverImageUrl }
                          : require('../../assets/hobbyspace.png')
                      }
                      style={styles.discoverImg}
                      imageStyle={styles.imageRadius}
                    >
                      <View style={styles.cardOverlay}>
                        <Text style={styles.cardTitle}>{hobby.name}</Text>
                        <Text style={styles.cardSub}>
                          {hobby.membersCount.toLocaleString('pt-BR')} Pessoas
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
            </View>

          </View>
        )}

        <View style={{ height: 120 }} />

      </ScrollView>

      <BottomBar />

    </View>
  );
}
