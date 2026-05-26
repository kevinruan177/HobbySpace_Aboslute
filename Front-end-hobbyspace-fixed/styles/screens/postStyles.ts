// styles/screens/postStyles.ts

import { StyleSheet } from "react-native";

export const postStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },

  content: {
    paddingTop: 125,
    paddingHorizontal: 14,
  },

  /* ================= POST ================= */

  postCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 14,

    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 12,
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,
  },

  avatar: {
    width: 42,
    height: 42,

    borderRadius: 50,
  },

  username: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },

  time: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },

  postText: {
    fontSize: 15,
    color: "#222",

    lineHeight: 22,

    marginBottom: 14,
  },

  postImage: {
    width: "100%",
    height: 220,

    borderRadius: 20,

    marginBottom: 14,
  },

  /* ================= ACTIONS ================= */

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftActions: {
    flexDirection: "row",
    alignItems: "center",

    gap: 18,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
  },

  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },

  /* ================= COMMENTS ================= */

  feedbackTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",

    marginBottom: 18,
    marginLeft: 4,
  },

  commentContainer: {
    flexDirection: "row",

    alignItems: "flex-start",

    marginBottom: 20,
  },

  commentAvatar: {
    width: 42,
    height: 42,

    borderRadius: 50,

    marginRight: 10,
  },

  commentContent: {
    flex: 1,
  },

  commentCard: {
    backgroundColor: "#EDEDED",

    borderRadius: 18,

    padding: 12,
  },

  commentTop: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 6,
  },

  commentUser: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },

  commentTime: {
    fontSize: 11,
    color: "#999",
  },

  commentText: {
    fontSize: 14,
    color: "#444",

    lineHeight: 20,
  },

  commentActions: {
    flexDirection: "row",
    alignItems: "center",

    gap: 16,

    marginTop: 8,
    marginLeft: 8,
  },

  replyText: {
    color: "#6B19FF",
    fontWeight: "700",
    fontSize: 13,
  },

  likeRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 4,
  },

  likeText: {
    fontSize: 13,
    color: "#444",
  },

  /* ================= INPUT ================= */

  inputContainer: {
    position: "absolute",
    bottom: 88,

    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 12,
    paddingVertical: 10,

    backgroundColor: "#F3F3F3",
  },

  input: {
    flex: 1,

    height: 52,

    backgroundColor: "#FFFFFF",

    borderRadius: 30,

    paddingHorizontal: 18,

    fontSize: 14,

    borderWidth: 1,
    borderColor: "#E4E4E4",
  },

  sendButton: {
    width: 52,
    height: 52,

    borderRadius: 50,

    backgroundColor: "#6B19FF",

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 10,
  },


  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  postTime: {
    fontSize: 11,
    color: '#9B8FBB',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0E8FB',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentInput: {
    flex: 1,
    minHeight: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    color: '#333',
  },
});
