import { StyleSheet } from "react-native";

export const ChatStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },

  /* CHAT */

  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },

  aiCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,

    padding: 22,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,

    marginBottom: 25,
  },

  poweredContainer: {
    backgroundColor: "#F7B59B",

    alignSelf: "flex-start",

    paddingHorizontal: 10,
    paddingVertical: 4,

    borderRadius: 30,
    marginBottom: 15,
  },

  poweredText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#4B0FAE",
    lineHeight: 30,
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: "#2B2B2B",
    lineHeight: 22,
  },

  /* MESSAGES */

  messageContainer: {
    marginBottom: 16,
  },

  userMessageContainer: {
    alignItems: "flex-end",
  },

  botMessageContainer: {
    alignItems: "flex-start",
  },

  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
  },

  userBubble: {
    backgroundColor: "#7B5CFF",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  botBubble: {
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 21,
  },

  userMessageText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  botMessageText: {
    color: "#2B2B2B",
  },

  timeText: {
    marginTop: 8,
    fontSize: 11,
    color: "#999999",
    alignSelf: "flex-end",
  },

  /* SUGGESTIONS */

  suggestionsContainer: {
    marginTop: 25,
    marginBottom: 20,
  },

  suggestionsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    marginBottom: 12,
  },

  suggestionButton: {
    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    paddingVertical: 14,
    paddingHorizontal: 16,

    marginBottom: 10,

    borderWidth: 1,
    borderColor: "#E8E8E8",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  suggestionText: {
    color: "#4B4B4B",
    fontSize: 14,
    fontWeight: "500",
  },

  /* INPUT */

  inputContainer: {
    position: "absolute",
    bottom: 90,

    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 12,
    paddingVertical: 10,

    backgroundColor: "#F3F3F3",
  },

  input: {
    flex: 1,

    minHeight: 48,

    backgroundColor: "#FFFFFF",

    borderRadius: 30,

    paddingHorizontal: 18,

    borderWidth: 1,
    borderColor: "#D8D8D8",

    fontSize: 14,
    color: "#000000",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  sendButton: {
    width: 48,
    height: 48,

    borderRadius: 50,

    backgroundColor: "#6B19FF",

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 10,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

});