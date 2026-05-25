// ============================================================
// TYPES GLOBAIS — HobbySpace
// Ajuste os campos conforme o contrato do backend
// ============================================================

// ---------- AUTH ----------
export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    createdAt: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}

// ---------- HOBBY ----------
export interface Hobby {
    id: string;
    name: string;
    icon: string;
    level: string;
    progressPercent: number;   // 0-100
    communitySlug: string;
    membersCount: number;
    coverImageUrl?: string;
}

// ---------- POST ----------
export interface Post {
    id: string;
    user: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    communitySlug: string;
    text: string;
    imageUrl?: string;
    likesCount: number;
    commentsCount: number;
    savesCount: number;
    isLiked: boolean;
    isSaved: boolean;
    createdAt: string;
}

export interface Comment {
    id: string;
    user: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    text: string;
    likesCount: number;
    createdAt: string;
}

export interface CreatePostPayload {
    communitySlug: string;
    text: string;
    imageBase64?: string;
}

// ---------- COMMUNITY ----------
export interface Community {
    slug: string;
    title: string;
    membersCount: number;
    coverImageUrl?: string;
}

// ---------- NOTIFICATION ----------
export type NotificationCategory = 'Todas' | 'Comunidade' | 'Progresso';
export type NotificationType = 'like' | 'comment' | 'level_up' | 'follow';

export interface Notification {
    id: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: string;
    actor?: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    postImageUrl?: string;
    message: string;
    extra?: {
        level?: string;
        nextLevel?: string;
        progressPercent?: number;
    };
}

// ---------- CHAT IA ----------
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
}

export interface SendMessagePayload {
    message: string;
    conversationId?: string;
}

export interface SendMessageResponse {
    conversationId: string;
    reply: ChatMessage;
}

// ---------- PAGINAÇÃO ----------
export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    totalPages: number;
    totalItems: number;
}