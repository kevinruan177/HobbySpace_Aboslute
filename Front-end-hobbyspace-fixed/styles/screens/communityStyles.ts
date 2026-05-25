import { StyleSheet } from "react-native";

export const communityStyles = StyleSheet.create({

  /* CONTAINER */

  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },

  /* SCROLL */
  scroll: {
    flex: 1,
    paddingHorizontal: 12,
  },

  /* CARD */

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 14,

    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  /* HEADER CARD */

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 10,
  },

  /* USER INFO */

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,

    borderRadius: 50,

    marginRight: 10,
  },

  username: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },

  time: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },

  /* TEXTO */

  postText: {
    fontSize: 15,
    color: "#222",

    lineHeight: 22,

    marginBottom: 12,
  },

  /* IMAGEM */

  postImage: {
    width: "100%",
    height: 220,

    borderRadius: 18,

    overflow: "hidden",

    marginBottom: 14,
  },

  postImageRadius: {
    borderRadius: 18,
  },

  /* FOOTER */

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },

  /* FLOAT BUTTON */

  floatingButton: {
    position: "absolute",

    right: 22,
    bottom: 110,

    width: 62,
    height: 62,

    borderRadius: 50,

    backgroundColor: "#6B19FF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#6B19FF",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

});