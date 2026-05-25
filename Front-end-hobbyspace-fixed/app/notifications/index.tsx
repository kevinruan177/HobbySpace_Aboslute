import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { NotificationsStyles as styles } from "../../styles/screens/notificationsStyles";

import { NotificationsHeader } from "../../components/NotificationsHeader";
import { BottomBar } from "../../components/BottomBar";

// INTEGRAÇÃO
import { useNotifications } from "../../hooks/useNotifications";
import type { Notification, NotificationCategory } from "../../types";

// ================= CARD DE NOTIFICAÇÃO =================
function NotificationCard({
  notification,
  onMarkRead,
}: {
  notification: Notification;
  onMarkRead: (id: string) => void;
}) {

  const isLevelUp = notification.type === 'level_up';

  return (
    <Pressable
      style={[
        styles.notificationCard,
        !notification.isRead && { borderLeftWidth: 3, borderLeftColor: '#6D28D9' }
      ]}
      onPress={() => !notification.isRead && onMarkRead(notification.id)}
    >

      <View style={styles.leftContent}>

        {/* ÍCONE OU AVATAR */}
        {isLevelUp ? (
          <View style={styles.progressIcon}>
            <Ionicons name="star" size={18} color="#FFFFFF" />
          </View>
        ) : (
          <View style={styles.avatarContainer}>
            {notification.actor?.avatarUrl ? (
              <Image source={{ uri: notification.actor.avatarUrl }} style={styles.avatar} />
            ) : (
              <Image source={require("../../assets/perfilpadrao.png")} style={styles.avatar} />
            )}
            {notification.type === 'like' && (
              <View style={styles.likeIcon}>
                <Ionicons name="heart" size={12} color="#FFFFFF" />
              </View>
            )}
            {notification.type === 'comment' && (
              <View style={[styles.likeIcon, { backgroundColor: '#6D28D9' }]}>
                <Ionicons name="chatbubble" size={10} color="#FFFFFF" />
              </View>
            )}
          </View>
        )}

        {/* TEXTO */}
        <View style={styles.textContainer}>

          <Text style={styles.description}>
            {notification.actor && (
              <Text style={styles.bold}>{notification.actor.name} </Text>
            )}
            {notification.message}
          </Text>

          {/* PROGRESSO (level_up) */}
          {isLevelUp && notification.extra && (
            <>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, {
                  width: `${notification.extra.progressPercent ?? 100}%`
                }]} />
              </View>
              {notification.extra.nextLevel && (
                <Text style={styles.levelText}>
                  Próximo nível: {notification.extra.nextLevel}
                </Text>
              )}
            </>
          )}

          <Text style={styles.time}>
            {new Date(notification.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
            })}
          </Text>

        </View>

      </View>

      {/* PREVIEW DA FOTO DO POST */}
      {notification.postImageUrl && (
        <Image source={{ uri: notification.postImageUrl }} style={styles.preview} />
      )}

    </Pressable>
  );
}

// ================= TELA =================
export default function Notifications() {

  const [selected, setSelected] = useState<NotificationCategory>("Todas");
  const { notifications, isLoading, error, refresh, markAllAsRead } = useNotifications(selected);

  const handleMarkRead = async (id: string) => {
    const { notificationService } = await import('../../services/notificationService');
    await notificationService.markAsRead(id);
    refresh();
  };

  return (
    <View style={styles.container}>

      <NotificationsHeader
        selected={selected}
        onSelect={(val) => setSelected(val as NotificationCategory)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* BOTÃO MARCAR TUDO */}
        {notifications.some(n => !n.isRead) && (
          <TouchableOpacity
            onPress={markAllAsRead}
            style={{ alignSelf: 'flex-end', marginBottom: 8, marginRight: 16 }}
          >
            <Text style={{ color: '#6D28D9', fontSize: 13 }}>Marcar todas como lidas</Text>
          </TouchableOpacity>
        )}

        {/* LOADING */}
        {isLoading && (
          <ActivityIndicator color="#6D28D9" style={{ marginTop: 32 }} />
        )}

        {/* ERRO */}
        {error && !isLoading && (
          <View style={{ alignItems: 'center', marginTop: 32 }}>
            <Text style={{ color: '#999', marginBottom: 12 }}>{error}</Text>
            <Pressable onPress={refresh}>
              <Text style={{ color: '#6D28D9', fontWeight: '600' }}>Tentar novamente</Text>
            </Pressable>
          </View>
        )}

        {/* VAZIO */}
        {!isLoading && !error && notifications.length === 0 && (
          <Text style={{ color: '#999', textAlign: 'center', marginTop: 40 }}>
            Nenhuma notificação por aqui.
          </Text>
        )}

        {/* LISTA */}
        {!isLoading && notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkRead={handleMarkRead}
          />
        ))}

        <View style={{ height: 140 }} />

      </ScrollView>

      <BottomBar />

    </View>
  );
}
