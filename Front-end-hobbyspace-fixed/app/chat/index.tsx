import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import { AppHeader } from "../../components/Header";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { ChatStyles as styles } from "../../styles/screens/chatStyles";

// COMPONENTE DA BOTTOM BAR
import { BottomBar } from "../../components/BottomBar";

// IA
import { enviarParaIA } from "../../services/ai_service";

export default function Chat() {

  // MENSAGENS
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Olá! ✨ Me conte seus gostos e eu vou te ajudar a encontrar hobbies incríveis para você!",
      timestamp: new Date(),
    },
  ]);

  // INPUT
  const [inputMessage, setInputMessage] =
    useState("");

  // LOADING
  const [isLoading, setIsLoading] =
    useState(false);

  // REF SCROLL
  const scrollViewRef =
    useRef<ScrollView | null>(null);

  // AUTO SCROLL
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  // ENVIAR MENSAGEM
  const handleSendMessage = async () => {

    // VALIDAR
    if (!inputMessage.trim()) return;

    // MENSAGEM USER
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    // ADICIONAR
    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    // LIMPAR INPUT
    const currentInput = inputMessage;

    setInputMessage("");

    // LOADING
    setIsLoading(true);

    try {

      // FORMATAR HISTÓRICO
      const historicoFormatado = messages.map(
        (msg) => ({
          type: msg.type,
          content: msg.content,
        })
      );

      // RESPOSTA IA
      const aiResponse = await enviarParaIA(
        currentInput,
        historicoFormatado
      );

      // MENSAGEM BOT
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content:
          aiResponse ||
          "Não consegui responder 😢",
        timestamp: new Date(),
      };

      // ADICIONAR
      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);

    } catch (error) {

      console.log("ERRO CHAT:", error);

      // MENSAGEM ERRO
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        content:
          "Desculpe 😢 ocorreu um erro ao responder.",
        timestamp: new Date(),
      };

      // ADICIONAR
      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);

    } finally {

      setIsLoading(false);

    }
  };

  return (

    <View style={styles.container}>

      {/* HEADER */}
      <AppHeader
        title="ChatIA"
        variant="com-fundo"
        showNotification={true}
        rightButton="settings"
      />

      {/* CHAT */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 120,
          paddingBottom: 200,
        }}
      >

        {/* CARD IA */}
        <View style={styles.aiCard}>

          <View style={styles.poweredContainer}>
            <Text style={styles.poweredText}>
              ✨ POWERED BY AI
            </Text>
          </View>

          <Text style={styles.title}>
            Encontre sua{"\n"}
            próxima paixão
          </Text>

          <Text style={styles.description}>
            Me conte o que você gosta e eu
            vou sugerir hobbies perfeitos
            para você!
          </Text>

        </View>

        {/* MENSAGENS */}
        {messages.map((message) => (

          <View
            key={message.id}
            style={[
              styles.messageContainer,

              message.type === "user"
                ? styles.userMessageContainer
                : styles.botMessageContainer,
            ]}
          >

            <View
              style={[
                styles.messageBubble,

                message.type === "user"
                  ? styles.userBubble
                  : styles.botBubble,
              ]}
            >

              <Text
                style={[
                  styles.messageText,

                  message.type === "user"
                    ? styles.userMessageText
                    : styles.botMessageText,
                ]}
              >

                {message.content}

              </Text>

              <Text style={styles.timeText}>

                {message.timestamp.toLocaleTimeString(
                  "pt-BR",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}

              </Text>

            </View>

          </View>

        ))}

        {/* LOADING */}
        {isLoading && (

          <View style={styles.botMessageContainer}>

            <View style={styles.botBubble}>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >

                <ActivityIndicator
                  size="small"
                  color="#8A7CFF"
                />

                <Text
                  style={{
                    marginLeft: 10,
                    color: "#555",
                  }}
                >

                  Procurando hobbies...

                </Text>

              </View>

            </View>

          </View>

        )}

        {/* SUGESTÕES */}
        <View style={styles.suggestionsContainer}>

          <Text style={styles.suggestionsTitle}>
            Sugestões ✨
          </Text>

          {[
            "Quais hobbies combinam comigo?",
            "Quero hobbies criativos",
            "Hobbies baratos para começar",
            "Sugira hobbies musicais",
          ].map((item, index) => (

            <TouchableOpacity
              key={index}
              style={styles.suggestionButton}
              onPress={() =>
                setInputMessage(item)
              }
            >

              <Text style={styles.suggestionText}>
                {item}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

      </ScrollView>

      {/* INPUT */}
      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Enviar uma mensagem..."
          placeholderTextColor="#B6B6B6"
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          editable={!isLoading}
          multiline
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={isLoading}
        >

          <Ionicons
            name="send"
            size={22}
            color="#FFFFFF"
          />

        </TouchableOpacity>

      </View>

      {/* BOTTOM BAR */}
      <BottomBar />

    </View>

  );
}