import React from "react";

import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

// IMPORTAR ROUTER
import {
  useRouter,
  usePathname
} from "expo-router";

export function BottomBar() {

  // ROTAS
  const router = useRouter();

  // PEGA ROTA ATUAL
  const pathname = usePathname();

  // Inset inferior do sistema (barra de navegação Android + iPhone home indicator)
  const insets = useSafeAreaInsets();
  const bottomPad = insets.bottom > 0 ? insets.bottom : (Platform.OS === 'android' ? 12 : 0);

  return (

    // CONTAINER DA BARRA
    <View style={[styles.container, { paddingBottom: bottomPad, height: 90 + bottomPad }]}>

      {/* ================= CHAT IA ================= */}
      <TouchableOpacity
        style={[
          styles.button,

          pathname === "/chat" &&
          styles.activeButton,
        ]}
        onPress={() => router.push("/chat")}
      >

        <Image
          source={
            pathname === "/chat"
              ? require("../assets/chatIAcor.png")
              : require("../assets/chat.png")
          }
          style={styles.icon}
        />

      </TouchableOpacity>

      {/* ================= HOBBIES ================= */}
      <TouchableOpacity
        style={[
          styles.button,

          pathname === "/home" &&
          styles.activeButton,
        ]}
        onPress={() => router.push("/home")}
      >

        <Image
          source={
            pathname === "/home"
              ? require("../assets/hobbycor.png")
              : require("../assets/hobby.png")
          }
          style={styles.hobbyIcon}
        />

      </TouchableOpacity>

      {/* ================= PERFIL ================= */}
      <TouchableOpacity
        style={[
          styles.button,

          pathname === "/profile" &&
          styles.activeButton,
        ]}
        onPress={() => router.push("/profile")}
      >

        <Image
          source={
            pathname === "/profile"
              ? require("../assets/perfilcor.png")
              : require("../assets/perfil.png")
          }
          style={styles.icon}
        />

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  // ================= BARRA =================
  container: {
    position: "absolute",
    bottom: 0,

    width: "100%",
    height: 90,

    backgroundColor: "#F1F2F2",

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-around",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    // SOMBRA IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    // SOMBRA ANDROID
    elevation: 10,
  },

  // ================= BOTÕES =================
  button: {
    width: 100,
    height: 65,

    borderRadius: 40,

    alignItems: "center",
    justifyContent: "center",
  },

  // ================= BOTÃO ATIVO =================
  activeButton: {
    backgroundColor: "#E7DBFF",

    // deixa o fundo maior visualmente
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  // ================= ÍCONES =================
  icon: {
    width: 54,
    height: 54,

    resizeMode: "contain",
  },

  // ================= HOBBY =================
  hobbyIcon: {
    width: 85,
    height: 85,

    resizeMode: "contain",
  },

});