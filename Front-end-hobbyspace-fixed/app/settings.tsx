import React, { useState } from 'react';
import { AppHeader } from '../components/Header';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';

import {
  User,
  Lock,
  Bell,
  ShieldCheck,
  Info,
  LogOut,
} from 'lucide-react-native';

import { useRouter } from 'expo-router';
import { settingsStyles as styles } from '../styles/screens/settingsStyles';

// INTEGRAÇÃO
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function Settings() {

  const router = useRouter();
  const { user, logout, refreshUser } = useAuth();

  // MODAL DE EDITAR PERFIL
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(user?.name ?? '');
  const [editBio, setEditBio] = useState(user?.bio ?? '');
  const [savingProfile, setSavingProfile] = useState(false);

  const handleSaveProfile = async () => {
    if (!editName?.trim()) {
      Alert.alert('Atenção', 'O nome não pode ficar em branco.');
      return;
    }

    if (editName.trim().length < 3) {
      Alert.alert('Atenção', 'O nome deve ter pelo menos 3 caracteres.');
      return;
    }

    setSavingProfile(true);
    try {
      await api.patch('/auth/me', {
        name: editName.trim(),
        bio: editBio?.trim() || ''
      });
      await refreshUser();
      setEditModalVisible(false);
      Alert.alert('Salvo!', 'Perfil atualizado com sucesso.');
    } catch (error: any) {
      console.error('Erro ao salvar perfil:', error);
      Alert.alert('Erro', error?.message || 'Não foi possível salvar as alterações.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = async () => {

    console.log('CLICOU LOGOUT');

    await logout();

    console.log('LOGOUT FINALIZADO');

    router.replace('/auth/login');
  };

  const confirmLogout = async () => {

    console.log('CONFIRM LOGOUT');

    await handleLogout();

  };

  return (
    <SafeAreaView style={styles.safeContainer}>

      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER */}
      <AppHeader
        title="Configurações"
        variant="com-fundo"
        showNotification={false}
        showBackButton={true}
        rightButton="none"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* CONTA */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>Conta</Text>

          <View style={styles.card}>

            {/* EDITAR PERFIL */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.item}
              onPress={() => {
                setEditName(user?.name ?? '');
                setEditBio(user?.bio ?? '');
                setEditModalVisible(true);
              }}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#EAD8FF' }]}>
                <User color="#6A0DAD" size={22} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Editar Perfil</Text>
                <Text style={styles.itemSubtitle}>Nome, foto e bio</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* ALTERAR SENHA */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.item}
              onPress={() => Alert.alert('Em breve', 'Alteração de senha disponível em breve.')}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#FFE4D1' }]}>
                <Lock color="#FF8C42" size={22} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Alterar Senha</Text>
                <Text style={styles.itemSubtitle}>Atualize sua senha com segurança</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        {/* PREFERÊNCIAS */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>Preferências</Text>

          <View style={styles.card}>
            <TouchableOpacity activeOpacity={0.8} style={styles.item}>
              <View style={[styles.iconContainer, { backgroundColor: '#EAD8FF' }]}>
                <Bell color="#6A0DAD" size={22} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Notificações</Text>
                <Text style={styles.itemSubtitle}>E-mail e atualizações da comunidade</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        {/* SUPORTE */}
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>Suporte e Termos</Text>

          <View style={styles.card}>

            <TouchableOpacity activeOpacity={0.8} style={styles.item}>
              <View style={[styles.iconContainer, { backgroundColor: '#EEEEEE' }]}>
                <ShieldCheck color="#777" size={22} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Privacidade</Text>
                <Text style={styles.itemSubtitle}>Dados, permissões e segurança</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity activeOpacity={0.8} style={styles.item}>
              <View style={[styles.iconContainer, { backgroundColor: '#EEEEEE' }]}>
                <Info color="#777" size={22} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Ajuda e Suporte</Text>
                <Text style={styles.itemSubtitle}>FAQ, contato e termos de uso</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.item, {
            backgroundColor: '#FEE2E2',
            borderRadius: 12,
            marginTop: 8,
            paddingHorizontal: 16,
          }]}
          onPress={confirmLogout}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#FECACA' }]}>
            <LogOut color="#DC2626" size={22} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.itemTitle, { color: '#DC2626' }]}>Sair da conta</Text>
            <Text style={styles.itemSubtitle}>Encerrar sessão</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL EDITAR PERFIL */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}>
          <View style={{
            backgroundColor: '#FFF',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            paddingBottom: 40,
          }}>

            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 20, color: '#1A1A2E' }}>
              Editar Perfil
            </Text>

            <Text style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>NOME</Text>
            <TextInput
              value={editName}
              onChangeText={setEditName}
              style={{
                borderWidth: 1, borderColor: '#DDD', borderRadius: 10,
                paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16,
                fontSize: 15, color: '#333',
              }}
              placeholder="Seu nome"
              editable={!savingProfile}
            />

            <Text style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>BIO</Text>
            <TextInput
              value={editBio}
              onChangeText={setEditBio}
              multiline
              numberOfLines={3}
              style={{
                borderWidth: 1, borderColor: '#DDD', borderRadius: 10,
                paddingHorizontal: 14, paddingVertical: 10, marginBottom: 24,
                fontSize: 15, color: '#333', minHeight: 80, textAlignVertical: 'top',
              }}
              placeholder="Fale um pouco sobre você..."
              editable={!savingProfile}
            />

            <View style={{ flexDirection: 'row', gap: 12 }}>

              <TouchableOpacity
                style={{
                  flex: 1, paddingVertical: 14, borderRadius: 10,
                  borderWidth: 1, borderColor: '#DDD', alignItems: 'center',
                }}
                onPress={() => setEditModalVisible(false)}
                disabled={savingProfile}
              >
                <Text style={{ color: '#666', fontWeight: '600' }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1, paddingVertical: 14, borderRadius: 10,
                  backgroundColor: '#6D28D9', alignItems: 'center',
                }}
                onPress={handleSaveProfile}
                disabled={savingProfile}
              >
                {savingProfile ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={{ color: '#FFF', fontWeight: '600' }}>Salvar</Text>
                )}
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
