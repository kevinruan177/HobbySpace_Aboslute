import React from 'react';

import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import { useRouter } from 'expo-router';

import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';

import { hobbiesStyles as styles } from '../../styles/screens/hobbiesStyles';
import { BottomBar } from '../../components/BottomBar';

// INTEGRAÇÃO
import { useMyHobbies } from '../../hooks/useHobbies';
import type { Hobby } from '../../types';

// ================= COMPONENTE CARD =================
function HobbyCard({ hobby }: { hobby: Hobby }) {
  return (
    <View style={styles.hobbyCard}>

      <View style={styles.cardTopRow}>

        <View style={styles.iconBox}>
          <FontAwesome5 name="star" size={22} color="#4B0082" />
        </View>

        <Text style={styles.hobbyTitle}>{hobby.name}</Text>

        <View style={styles.levelCircle}>
          <Text style={styles.levelText}>{hobby.level}</Text>
        </View>

      </View>

      <View style={styles.progressWrapper}>

        <Text style={styles.percentageText}>{hobby.progressPercent}%</Text>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${hobby.progressPercent}%` },
            ]}
          />
        </View>

      </View>

    </View>
  );
}

// ================= TELA =================
export default function MeusHobbies() {

  const router = useRouter();
  const { hobbies, isLoading, error, refresh } = useMyHobbies();

  return (
    <View style={{ flex: 1 }}>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#4B0082" />
          </Pressable>

          <Text style={styles.headerTitle}>Meus Hobbies</Text>




        </View>

        <View style={styles.content}>

          <Text style={styles.subtitle}>
            Continue sua jornada de aprendizado.
            Aqui estão os hobbies que você está
            explorando no momento.
          </Text>

          <View style={styles.infoContainer}>
            <MaterialIcons name="info" size={22} color="#CCC" />
          </View>

          {/* LOADING */}
          {isLoading && (
            <ActivityIndicator color="#6D28D9" style={{ marginVertical: 20 }} />
          )}

          {/* ERRO */}
          {error && !isLoading && (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: '#999', marginBottom: 12 }}>{error}</Text>
              <Pressable onPress={refresh}>
                <Text style={{ color: '#6D28D9', fontWeight: '600' }}>Tentar novamente</Text>
              </Pressable>
            </View>
          )}

          {/* LISTA DE HOBBIES */}
          {!isLoading && !error && hobbies && hobbies.length === 0 && (
            <Text style={{ color: '#999', textAlign: 'center', marginTop: 24 }}>
              Você ainda não entrou em nenhum hobby.
            </Text>
          )}

          {!isLoading && hobbies && hobbies.map((hobby) => {
            if (!hobby || !hobby.id) return null;
            return (
              <HobbyCard key={hobby.id} hobby={hobby} />
            );
          })}

        </View>

        <View style={{ height: 120 }} />

      </ScrollView>

      <BottomBar />

    </View>
  );
}
