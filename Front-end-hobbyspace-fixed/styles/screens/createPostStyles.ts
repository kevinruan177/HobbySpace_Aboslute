// styles/screens/createPostStyles.ts

import { StyleSheet } from "react-native";

export const createPostStyles = StyleSheet.create({

    /* CONTAINER */

    container: {
        flex: 1,
        backgroundColor: "#F4F4F4",
    },
    scroll: {
        flex: 1,
        paddingHorizontal: 12,
    },

    /* CONTEÚDO */

    content: {
        flex: 1,

        paddingTop: 125,
        paddingHorizontal: 16,
    },

    /* PERFIL */

    profileRow: {
        flexDirection: "row",
        alignItems: "center",

        marginBottom: 22,
    },

    profileImage: {
        width: 52,
        height: 52,

        borderRadius: 50,

        marginRight: 12,
    },

    username: {
        fontSize: 28,
        fontWeight: "600",
        color: "#4A4A4A",
    },

    /* INPUT */

    input: {
        fontSize: 24,
        color: "#333",

        minHeight: 110,

        textAlignVertical: "top",

        marginBottom: 28,

        fontStyle: "italic",
    },

    /* ÁREA DE FOTO */

    uploadContainer: {
        width: "100%",
        height: 260,

        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#B7BED5",

        borderRadius: 22,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "rgba(255,255,255,0.35)",
    },

    /* BOTÃO */

    publishButton: {
        marginTop: 28,

        height: 58,

        borderRadius: 999,

        backgroundColor: "#6B19FF",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#6B19FF",
        shadowOpacity: 0.22,
        shadowRadius: 10,

        shadowOffset: {
            width: 0,
            height: 4,
        },

        elevation: 5,
    },

    publishText: {
        color: "#FFFFFF",

        fontSize: 18,
        fontWeight: "700",
    },

});