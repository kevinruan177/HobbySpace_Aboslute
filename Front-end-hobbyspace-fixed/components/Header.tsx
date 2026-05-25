// components/AppHeader.tsx

import React from "react";

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";

interface AppHeaderProps {
  title: string;

  /*
    sem-fundo = transparente
    com-fundo = branco
  */
  variant?: "sem-fundo" | "com-fundo";

  /*
    mostrar sino
  */
  showNotification?: boolean;

  /*
    mostrar botão voltar
  */
  showBackButton?: boolean;

  /*
    profile = foto perfil
    settings = engrenagem
    none = sem botão
  */
  rightButton?: "profile" | "settings" | "none";

  onNotificationPress?: () => void;

  onRightPress?: () => void;

  onBackPress?: () => void;
}

export function AppHeader({
  title,
  variant = "sem-fundo",
  showNotification = true,
  showBackButton = false,
  rightButton = "profile",
  onNotificationPress,
  onRightPress,
  onBackPress,
}: AppHeaderProps) {

  const router = useRouter();

  return (
    <View
      style={[
        styles.header,

        variant === "com-fundo" &&
          styles.headerBackground,
      ]}
    >

      {/* LADO ESQUERDO */}
      <View style={styles.leftContainer}>

        {/* BOTÃO BACK */}
        {showBackButton && (
          <Pressable
            style={styles.backButton}
            onPress={
              onBackPress ||
              (() => router.back())
            }
          >

            <Ionicons
              name="arrow-back"
              size={24}
              color="#5B11D9"
            />

          </Pressable>
        )}

        {/* TEXTO */}
        <Text
          numberOfLines={1}
          style={[
            styles.logo,

            showBackButton &&
              styles.logoWithBack,
          ]}
        >
          {title}
        </Text>

      </View>

      {/* LADO DIREITO */}
      <View style={styles.rightContainer}>

        {/* SININHO */}
        {showNotification && (
          <Pressable
            style={styles.notificationButton}
            onPress={
              onNotificationPress ||
              (() => router.push("/notifications"))
            }
          >

            <Ionicons
              name="notifications"
              size={24}
              color="#5B11D9"
            />

          </Pressable>
        )}

        {/* PERFIL */}
        {rightButton === "profile" && (
          <Pressable
            onPress={
              onRightPress ||
              (() => router.push("/profile"))
            }
          >

            <Image
              source={require("../assets/perfilpadrao.png")}
              style={styles.profileImage}
            />

          </Pressable>
        )}

        {/* CONFIG */}
        {rightButton === "settings" && (
          <Pressable
            style={styles.settingsButton}
            onPress={
              onRightPress ||
              (() => router.push("/settings"))
            }
          >

            <Ionicons
              name="settings-sharp"
              size={24}
              color="#5B11D9"
            />

          </Pressable>
        )}

        {/* NONE */}
        {rightButton === "none" && (
          <View style={styles.emptySpace} />
        )}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  /* HEADER */

  header: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,

    zIndex: 999,
    elevation: 999,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,

    paddingTop: 55,
    paddingBottom: 18,
  },

  /* HEADER COM FUNDO */

  headerBackground: {
    backgroundColor: "#FFFFFF",

    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 6,
  },

  /* LADO ESQUERDO */

  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  /* BOTÃO VOLTAR */

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 50,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 8,
  },

  /* TEXTO */

  logo: {
    fontSize: 30,
    fontWeight: "700",
    color: "#4B0FAE",
  },

  /* TEXTO QUANDO TEM BACK */

  logoWithBack: {
    fontSize: 24,
    marginLeft: 2,
  },

  /* LADO DIREITO */

  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,

    marginLeft: 12,
    minWidth: 44,
    justifyContent: "flex-end",
  },

  /* SININHO */

  notificationButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  /* PERFIL */

  profileImage: {
    width: 44,
    height: 44,

    borderRadius: 50,

    borderWidth: 1,
    borderColor: "#E4E4E4",
  },

  /* CONFIG */

  settingsButton: {
    width: 44,
    height: 44,

    borderRadius: 50,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",
  },

  /* ESPAÇO VAZIO */

  emptySpace: {
    width: 44,
    height: 44,
  },

});