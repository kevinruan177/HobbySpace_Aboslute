// components/NotificationsHeader.tsx

import React from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

interface NotificationsHeaderProps {
  selected: string;

  onSelect: (category: string) => void;

  onMarkAllRead?: () => void;
}

const categories = [
  "Todas",
  "Comunidade",
  "Progresso",
];

export function NotificationsHeader({
  selected,
  onSelect,
  onMarkAllRead,
}: NotificationsHeaderProps) {

  return (
    <View style={styles.wrapper}>

      {/* TOPO */}
      <View style={styles.topContainer}>

        <Text style={styles.title}>
          Notificações
        </Text>

        <Pressable onPress={onMarkAllRead}>
          <Text style={styles.markRead}>
            Marcar todas como lidas
          </Text>
        </Pressable>

      </View>

      {/* CATEGORIAS */}
      <View style={styles.categoriesContainer}>

        {categories.map((item) => {

          const active = selected === item;

          return (
            <Pressable
              key={item}
              onPress={() => onSelect(item)}
              style={[
                styles.categoryButton,

                active &&
                  styles.categoryButtonActive,
              ]}
            >

              <Text
                style={[
                  styles.categoryText,

                  active &&
                    styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>

            </Pressable>
          );
        })}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  /* WRAPPER */

  wrapper: {
    backgroundColor: "#FFFFFF",

    paddingTop: 60,
    paddingBottom: 20,

    paddingHorizontal: 20,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  /* TOPO */

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 20,
  },

  /* TÍTULO */

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#4B0FAE",
  },

  /* MARCAR COMO LIDA */

  markRead: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7B61FF",
  },

  /* CATEGORIAS */

  categoriesContainer: {
    flexDirection: "row",
    gap: 12,
  },

  /* BOTÃO */

  categoryButton: {
    flex: 1,

    height: 42,

    borderRadius: 999,

    backgroundColor: "#F4F1FF",

    justifyContent: "center",
    alignItems: "center",
  },

  /* BOTÃO ATIVO */

  categoryButtonActive: {
    backgroundColor: "#f0ab8bff",
  },

  /* TEXTO */

  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7A6EAA",
  },

  /* TEXTO ATIVO */

  categoryTextActive: {
    color: "#FFFFFF",
  },

});