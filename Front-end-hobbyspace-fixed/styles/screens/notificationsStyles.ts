// styles/screens/notificationsStyles.ts

import { StyleSheet } from "react-native";

export const NotificationsStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#4B0FAE",
  },

  markRead: {
    fontSize: 12,
    color: "#4B0FAE",
    fontWeight: "600",
  },

  /* CONTENT */
  content: {
    marginTop: 20,
    paddingHorizontal: 15,
    gap: 18,
  },

  /* CARD */

  notificationCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  leftContent: {
    flexDirection: "row",
    flex: 1,
  },

  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },

  likeIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,

    width: 18,
    height: 18,

    borderRadius: 20,

    backgroundColor: "#B18CFF",

    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
  },

  description: {
    fontSize: 15,
    color: "#5B5B5B",
    lineHeight: 20,
  },

  bold: {
    fontWeight: "700",
    color: "#4B4B4B",
  },

  time: {
    marginTop: 4,
    color: "#A0A0A0",
    fontSize: 14,
  },

  preview: {
    width: 64,
    height: 64,

    borderRadius: 18,
    marginLeft: 12,
  },

  /* PROGRESSO */

  progressIcon: {
    width: 42,
    height: 42,

    borderRadius: 50,

    backgroundColor: "#5B11D9",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  progressBar: {
    width: "100%",
    height: 10,

    backgroundColor: "#E7E7E7",

    borderRadius: 20,

    marginTop: 12,
    overflow: "hidden",
  },

  progressFill: {
    width: "92%",
    height: "100%",

    backgroundColor: "#5B11D9",
  },

  levelText: {
    marginTop: 6,
    fontSize: 13,
    color: "#8C8C8C",
  },

});