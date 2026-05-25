import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import { AppHeader } from "../../../components/Header";
import { BottomBar } from "../../../components/BottomBar";
import { postStyles as styles } from "../../../styles/screens/postStyles";

// INTEGRAÇÃO
import { usePostDetails } from "../../../hooks/usePosts";
import type { Comment } from "../../../types";

// ================= CARD DE COMENTÁRIO =================
function CommentCard({ comment }: { comment: Comment }) {
  return (
    <View style={styles.commentContainer}>

      {comment.user.avatarUrl ? (
        <Image source={{ uri: comment.user.avatarUrl }} style={styles.commentAvatar} />
      ) : (
        <Image source={require("../../../assets/perfilpadrao.png")} style={styles.commentAvatar} />
      )}

      <View style={styles.commentContent}>

        <View style={styles.commentCard}>

          <View style={styles.commentTop}>
            <Text style={styles.commentUser}>{comment.user.name}</Text>
            <Text style={styles.commentTime}>
              {new Date(comment.createdAt).toLocaleDateString('pt-BR', {
                hour: '2-digit', minute: '2-digit'
              })}
            </Text>
          </View>

          <Text style={styles.commentText}>{comment.text}</Text>

        </View>

        <View style={styles.commentActions}>

          <TouchableOpacity>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>

          <View style={styles.likeRow}>
            <Ionicons name="heart-outline" size={14} color="#444" />
            <Text style={styles.likeText}>{comment.likesCount}</Text>
          </View>

        </View>

      </View>

    </View>
  );
}

// ================= TELA =================
export default function PostDetails() {

  const { slug: postId } = useLocalSearchParams<{ slug: string }>();
  const [commentText, setCommentText] = useState('');

  const { post, comments, isLoading, isSending, error, sendComment } = usePostDetails(postId || '');

  const handleSend = async () => {
    if (!commentText?.trim()) return;
    try {
      await sendComment(commentText.trim());
      setCommentText('');
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
      Alert.alert('Erro', 'Não foi possível enviar o comentário.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>

        {/* HEADER */}
        <AppHeader
          title="Post"
          variant="com-fundo"
          showBackButton={true}
          showNotification={true}
          rightButton="profile"
        />

        {/* CONTEÚDO */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {/* LOADING */}
          {isLoading && (
            <ActivityIndicator color="#6D28D9" style={{ marginTop: 40 }} />
          )}

          {/* ERRO */}
          {error && !isLoading && (
            <Text style={{ color: '#999', textAlign: 'center', marginTop: 40 }}>{error}</Text>
          )}

          {/* POST */}
          {post && !isLoading && (
            <View style={styles.postCard}>

              {/* TOPO */}
              <View style={styles.postHeader}>

                <View style={styles.userContainer}>

                  {post.user.avatarUrl ? (
                    <Image source={{ uri: post.user.avatarUrl }} style={styles.avatar} />
                  ) : (
                    <Image source={require("../../../assets/perfilpadrao.png")} style={styles.avatar} />
                  )}

                  <View>
                    <Text style={styles.username}>{post.user.name}</Text>
                    <Text style={styles.time}>
                      {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </Text>
                  </View>

                </View>

                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={22} color="#222" />
                </TouchableOpacity>

              </View>

              {/* TEXTO */}
              <Text style={styles.postText}>{post.text}</Text>

              {/* FOTO */}
              {post.imageUrl && (
                <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
              )}

              {/* AÇÕES */}
              <View style={styles.actionsRow}>

                <View style={styles.leftActions}>

                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons
                      name={post.isLiked ? "heart" : "heart-outline"}
                      size={20}
                      color={post.isLiked ? "#E53E3E" : "#444"}
                    />
                    <Text style={styles.actionText}>{post.likesCount}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={18} color="#444" />
                    <Text style={styles.actionText}>{post.commentsCount}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons
                      name={post.isSaved ? "bookmark" : "bookmark-outline"}
                      size={18}
                      color={post.isSaved ? "#6D28D9" : "#444"}
                    />
                    <Text style={styles.actionText}>{post.savesCount}</Text>
                  </TouchableOpacity>

                </View>

                <TouchableOpacity>
                  <Ionicons name="share-social-outline" size={22} color="#444" />
                </TouchableOpacity>

              </View>

            </View>
          )}

          {/* COMENTÁRIOS */}
          {!isLoading && comments.length > 0 && (
            <Text style={styles.feedbackTitle}>Feedback da comunidade</Text>
          )}

          {!isLoading && comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}

          <View style={{ height: 180 }} />

        </ScrollView>

        {/* INPUT DE COMENTÁRIO */}
        <View style={styles.inputContainer}>

          <TextInput
            placeholder="Escreva um comentário..."
            placeholderTextColor="#9E9E9E"
            style={styles.input}
            value={commentText}
            onChangeText={setCommentText}
            editable={!isSending}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            disabled={isSending || !commentText.trim()}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Ionicons name="send" size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>

        </View>

        <BottomBar />

      </View>
    </KeyboardAvoidingView>
  );
}
